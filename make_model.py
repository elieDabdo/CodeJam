from ultralytics import YOLO
model = YOLO("yolov8n-pose.pt")
model.export(format="onnx", opset=10, simplify=True)