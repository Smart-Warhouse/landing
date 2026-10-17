/**
 * Tech stack by group (labels in the copy dictionaries, `stack.groups`, same order). Product and
 * library names are not translated. Source: system-requirements.md §§4-5, 8, 11-12, 15.
 */
export const STACK = [
  ['ESP32-S3', 'FreeRTOS', 'ESP-IDF / PlatformIO', 'micro-ROS', 'C/C++'],
  ['ROS 2 Humble', 'JetPack 6', 'Nav2', 'slam_toolbox', 'robot_localization', 'Gazebo'],
  ['PyTorch', 'Ultralytics YOLO', 'Stable-Baselines3', 'ONNX', 'TensorRT', 'Gymnasium'],
  ['Python', 'FastAPI', 'PostgreSQL', 'Mosquitto MQTT', 'Docker Compose'],
  ['React', 'TypeScript', 'Vite', 'WebSocket', 'Gamepad API'],
  ['KiCad', 'Fusion 360 / FreeCAD', '3D printing', 'Git'],
] as const;
