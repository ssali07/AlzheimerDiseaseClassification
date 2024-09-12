import torch
import torch.nn as nn
import torch.nn.functional as F
from flask import Flask, request, render_template
from torchvision import transforms
from PIL import Image
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from io import BytesIO
import base64

app = Flask(__name__)

N_CLASSES = 4

# Define the model architecture
class BaselineCNN(nn.Module):
    def __init__(self):
        super(BaselineCNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.pool1 = nn.MaxPool2d(2, 2)
        self.batchnorm1 = nn.BatchNorm2d(num_features=32)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool2 = nn.MaxPool2d(2, 2)
        self.flatten = nn.Flatten()
        self.fc1 = nn.Linear(64 * 32 * 32, 128)
        self.out = nn.Linear(128, N_CLASSES)

    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = self.pool1(x)
        x = self.batchnorm1(x)
        x = F.relu(self.conv2(x))
        x = self.pool2(x)
        x = self.flatten(x)
        x = F.relu(self.fc1(x))
        x = self.out(x)
        return x

# Instantiate the model
model = BaselineCNN()

# Load the trained model weights
model.load_state_dict(torch.load('model.pth', map_location=torch.device('cpu')))
model.eval()

# Define the transformation to be applied to the input image
transform = transforms.Compose([
    transforms.Resize((128, 128)),  # Use the dimensions your model expects
    transforms.ToTensor(),
    #transforms.Normalize(mean=[0.5], std=[0.5])
])



def preprocess_image(image_path):
    image = Image.open(image_path).convert('L')
    image = transform(image)
    image = image.unsqueeze(0)  # Add batch dimension only
    image.requires_grad_()  # Enable gradients
    return image

def predict(image_path):
    image = preprocess_image(image_path)
    with torch.no_grad():
        output = model(255*image)
        probabilities = torch.softmax(output, dim=1).cpu().numpy()[0]
        probabilities_percentage = [round(prob * 100, 2) for prob in probabilities]
    return probabilities_percentage

# Generate Grad-CAM
def generate_gradcam(image_path, model, target_layer):
    image = preprocess_image(image_path)
    
    # Register hook to capture feature maps and gradients
    def hook_fn(module, input, output):
        global feature_maps
        feature_maps = output
    
    def backward_hook_fn(module, grad_input, grad_output):
        global gradients
        gradients = grad_output[0]
    
    target_layer.register_forward_hook(hook_fn)
    target_layer.register_backward_hook(backward_hook_fn)
    
    # Forward pass
    output = model(255*image)
    target_class = output.argmax().item()
    
    # Zero gradients and perform backward pass
    model.zero_grad()
    output[0, target_class].backward()
    
    # Compute Grad-CAM
    weights = torch.mean(gradients, dim=[0, 2, 3])
    gradcam = torch.zeros(feature_maps.shape[2:])
    for i, w in enumerate(weights):
        gradcam += w * feature_maps[0, i, :, :]
    
    gradcam = torch.clamp(gradcam, min=0)  # ReLU activation
    gradcam = gradcam / gradcam.max()  # Normalize
    gradcam = gradcam.detach().cpu().numpy()  # Detach and convert to NumPy
    
    return gradcam, target_class

# Generate Saliency Map
def generate_saliency_map(image_path):
    image = preprocess_image(image_path)

    # Forward pass
    output = model(255*image)
    target_class = output.argmax().item()
    
    # Zero gradients and perform backward pass
    model.zero_grad()
    output[0, target_class].backward()
    
    # Compute saliency map
    saliency, _ = torch.max(image.grad.data.abs(), dim=1)
    saliency = saliency.squeeze().cpu().detach().numpy()
    
    # Normalize saliency map
    saliency = (saliency - saliency.min()) / (saliency.max() - saliency.min())
    
    # Convert saliency map to image
    plt.imshow(saliency, cmap='jet')
    plt.axis('off')
    
    # Save the plot to a BytesIO object
    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    saliency_map = base64.b64encode(buf.getvalue()).decode('utf-8')
    buf.close()
    
    return saliency_map

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'No file part'
        file = request.files['file']
        if file.filename == '':
            return 'No selected file'
        if file:
            file_path = os.path.join('uploads', file.filename)
            os.makedirs('uploads', exist_ok=True)  # Ensure the directory exists
            file.save(file_path)
            probabilities = predict(file_path)
            saliency_map = generate_saliency_map(file_path)
            target_layer = model.conv2  # Choose an appropriate layer in your model
            gradcam, target_class = generate_gradcam(file_path, model, target_layer)
            
            # Convert Grad-CAM to base64
            plt.imshow(gradcam, cmap='jet')
            plt.axis('off')
            buf = BytesIO()
            plt.savefig(buf, format='png')
            buf.seek(0)
            gradcam_map = base64.b64encode(buf.getvalue()).decode('utf-8')
            buf.close()

            return render_template('result.html', probabilities=probabilities, saliency_map=saliency_map, gradcam_map=gradcam_map)
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
