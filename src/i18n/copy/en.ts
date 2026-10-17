import type { SiteCopy } from './types';

/**
 * English copy, written to the same intent as `ar.ts` (Arabic is authoritative). Every number is a
 * design TARGET from the requirements, not a measurement.
 */
export const en: SiteCopy = {
  meta: {
    title: 'Smart Warehouse & Autonomous Forklift Fleet | Graduation project',
    description:
      'A graduation project in progress: a 1:14-scale warehouse where three autonomous forklifts (plus one spare) move pallets under a central fleet manager, a warehouse management system and a live dashboard.',
  },
  common: {
    skipLink: 'Skip to content',
    newTab: '(opens in a new tab)',
    target: 'Target',
  },
  header: {
    brand: 'Smart Warehouse',
    homeLabel: 'Smart Warehouse, home',
    nav: [
      { label: 'How it works', href: '#how' },
      { label: 'Forklift', href: '#hardware' },
      { label: 'AI', href: '#ai' },
      { label: 'Safety', href: '#safety' },
      { label: 'Fleet', href: '#fleet' },
      { label: 'Plan', href: '#plan' },
    ],
    navLabel: 'Page sections',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    openDashboard: 'Open dashboard',
    themeToDark: 'Switch to dark mode',
    themeToLight: 'Switch to light mode',
    switchLang: 'العربية',
    switchLangAria: 'التبديل إلى العربية',
  },
  hero: {
    eyebrow: 'Graduation project · in progress',
    title: 'Smart Warehouse & Autonomous Forklift Fleet',
    pitch:
      'A 1:14-scale warehouse where three autonomous forklifts move pallets between racks, inbound and outbound docks, supervised by a fleet manager, a warehouse management system and a live dashboard.',
    ctaDashboard: 'Open dashboard',
    ctaHow: 'How it works',
    facts: [
      { value: '1:14', label: 'scale of the warehouse and forklifts' },
      { value: '3 + 1', label: 'forklifts, one of them a spare' },
      { value: '4', label: 'layers from server to motors' },
    ],
    note: 'Every number on this page is a design target from the requirements, not a measured result.',
    figureLabel:
      'Top-down illustration of a scale warehouse: racks, a lane network and three yellow forklifts, one carrying a pallet',
  },
  problem: {
    eyebrow: 'Problem and idea',
    title: 'Moving pallets is repetitive, and mistakes are expensive',
    intro:
      'In a warehouse, a person drives the forklift between racks all day. This project asks: what if the forklifts moved on their own, safely, and in coordination with each other?',
    pains: [
      {
        title: 'Repetitive, tiring work',
        body: 'Rack to dock and back, again and again. Repetition wears the driver down and invites mistakes.',
      },
      {
        title: 'Congested aisles',
        body: 'Once more than one forklift works the same floor, keeping them out of each other’s way becomes a problem of its own.',
      },
      {
        title: 'Stock nobody can find',
        body: 'If a move is not recorded the moment it happens, the pallet’s location is lost and the search begins.',
      },
    ],
    ideaLabel: 'The idea in one sentence',
    idea: 'Three small forklifts drive themselves around the warehouse, lift a pallet and take it to the right place, avoiding people and obstacles, all under a central system and a monitoring screen.',
    ideaPoints: [
      'A 1:14 scale model built on modified Huina 1577 Pro forklifts',
      'The warehouse management system (WMS) updates every pallet’s location after each move',
      'Safety designed to work even if the computer fails or Wi-Fi drops',
    ],
  },
  how: {
    eyebrow: 'How it works',
    title: 'Four layers, each one knows its limits',
    intro:
      'Think of a body: management hands out the work, a brain thinks and plans, nerves execute and protect, and senses and muscles touch the world.',
    layers: [
      {
        name: 'Server',
        nickname: 'management',
        stack: 'Fleet Manager · WMS · dashboard · MQTT',
        body: 'Hands tasks to forklifts, reserves aisle segments and knows where every pallet is.',
      },
      {
        name: 'Jetson Orin Nano Super',
        nickname: 'the brain',
        stack: 'ROS 2 Humble · SLAM · Nav2 · ArUco · YOLO · RL policy · safety supervisor',
        body: 'Maps the warehouse, localises the forklift on it, plans the path and sees pallets and people.',
      },
      {
        name: 'ESP32-S3',
        nickname: 'the nerves',
        stack: 'FreeRTOS · 1 kHz safety loop · PID · 500 ms watchdog',
        body: 'Executes the brain’s commands on the motors, and stops the forklift at once when something is wrong.',
      },
      {
        name: 'Sensors and motors',
        nickname: 'senses and muscles',
        stack: 'LiDAR C1 · camera · 6× ToF · IMU · AS5600 · TCRT5000 · limit · pot',
        body: 'Measure what is around the forklift, drive and steer the wheels, and lift the forks.',
      },
    ],
    links: ['Wi-Fi · MQTT', 'USB · micro-ROS', 'I²C · GPIO · ADC · PWM'],
    estop: {
      title: 'And above everything: a hardware E-Stop',
      body: 'The E-Stop cuts motor power directly, with no software involved, because safety must not depend on a computer. The Jetson and ESP32 stay powered to log the event and report it to the server.',
    },
    figureLabel:
      'Side view of a yellow forklift: a LiDAR on the roof scanning 360 degrees, a camera on the fork carriage and a ring of ToF sensors around the body',
    figureCaption:
      'The roof-mounted LiDAR sees 360°, and the ToF ring surrounds the body: closer than 40 cm means slow down, closer than 15 cm means stop.',
    figureTags: { lidar: 'LiDAR 360°', camera: 'Camera', tof: 'ToF ring', estop: 'E-Stop' },
  },
  hardware: {
    eyebrow: 'The forklift',
    title: 'A real RC forklift, with new senses',
    intro:
      'We keep the Huina 1577 Pro’s chassis, motors and original lift mechanism, replace the receiver board and battery, and add 3D-printed mounts in eight places.',
    points: [
      {
        title: 'LiDAR C1',
        place: 'On the overhead guard',
        why: 'Sees 360° without the mast or a carried pallet blocking it.',
      },
      {
        title: 'Camera',
        place: 'On the fork carriage, tilted 15 to 25° down',
        why: 'Moves with the lift and sees pallet pockets, ArUco markers and people.',
      },
      {
        title: 'ToF ring',
        place: '6 sensors: front, two corners, both sides, rear',
        why: 'A short-range safety ring the ESP32 reads directly.',
      },
      {
        title: 'Electronics bay',
        place: 'Inside the rear cover',
        why: 'Jetson, ESP32, motor drivers and battery, with ventilation slots.',
      },
      {
        title: 'TCRT5000',
        place: 'On both fork tips',
        why: 'Confirms the forks are fully inside the pallet.',
      },
      {
        title: 'Limit + pot',
        place: 'On the mast',
        why: 'Upper and lower lift limits, and fork height in millimetres.',
      },
      {
        title: 'AS5600',
        place: 'On the drive axle',
        why: 'A magnet and angle sensor measure distance and speed.',
      },
      {
        title: 'E-Stop',
        place: 'At the rear, on top of the cover',
        why: 'One-hand reach, cuts motor power without software.',
      },
    ],
    facts: [
      { label: 'Outer dimensions', value: '52.4 × 18.7 × 31.7 cm' },
      { label: 'Battery', value: '2S2P · 7.4 V · 7000 mAh' },
      { label: 'Added weight target', value: '≤ 700 g' },
    ],
    figureLabel: 'Forklift diagram with the proposed mount points numbered 1 to 8',
  },
  software: {
    eyebrow: 'Software architecture',
    title: 'Software that runs at three speeds',
    intro:
      'Slow, smart decisions on the Jetson; an instant, independent reflex on the ESP32; and coordination of the whole fleet on the server.',
    tiers: [
      {
        name: 'Server',
        platform: 'Python · FastAPI · PostgreSQL · Mosquitto · Docker Compose',
        rate: 'Target: API ≤ 100 ms, live stream at 2 Hz',
        modules: [
          { name: 'Fleet Manager', desc: 'Prioritised task queue' },
          { name: 'Traffic Manager', desc: 'Segment locks and deadlock detection' },
          { name: 'Task Allocation', desc: 'Which forklift takes which task' },
          { name: 'WMS', desc: 'Locations, pallets and move history' },
          { name: 'REST + WebSocket', desc: 'OpenAPI-documented API and a live feed' },
          { name: 'MQTT Broker', desc: 'Lightweight messages per forklift' },
        ],
      },
      {
        name: 'Jetson',
        platform: 'JetPack 6 · ROS 2 Humble · TensorRT',
        rate: 'The slow loop: 10 to 30 Hz',
        modules: [
          { name: 'forklift_perception', desc: 'ArUco, YOLO and pallet pose' },
          { name: 'forklift_navigation', desc: 'slam_toolbox, EKF and Nav2' },
          { name: 'forklift_mission', desc: 'Behavior tree and fleet client' },
          { name: 'forklift_rl', desc: 'RL policy on TensorRT' },
          { name: 'forklift_safety', desc: 'Speed limits, vetoes unsafe commands' },
          { name: 'forklift_sim', desc: 'Gazebo world of the warehouse' },
        ],
      },
      {
        name: 'ESP32',
        platform: 'FreeRTOS · ESP-IDF / PlatformIO',
        rate: 'Core 1: safety and control at 1 kHz · Core 0: comms',
        modules: [
          { name: 'safety_task', desc: '1 kHz: E-Stop, limits, ToF, watchdog' },
          { name: 'motor_pid_task', desc: '1 kHz: drive speed and fork height' },
          { name: 'tof_task', desc: '50 Hz per sensor via TCA9548A' },
          { name: 'imu_task', desc: '100 Hz with a Madgwick filter' },
          { name: 'microros_task', desc: 'Receives commands, publishes data' },
          { name: 'status_task', desc: '10 Hz: battery, LEDs and buzzer' },
        ],
      },
    ],
    protocolsTitle: 'How the parts talk',
    protocols: [
      {
        name: 'MQTT · JSON',
        desc: 'Forklift to server over Wi-Fi, so the server stays independent of ROS. Example: wh/fl/{id}/task',
      },
      {
        name: 'micro-ROS · USB',
        desc: 'Jetson to ESP32: cmd_vel at 20 Hz and a 10 Hz heartbeat; odom and tof_ring flow back.',
      },
      {
        name: 'ROS 2',
        desc: 'Inside the Jetson: one node per function, with a namespace per forklift (/fl1, /fl2, /fl3).',
      },
    ],
  },
  ai: {
    eyebrow: 'Artificial intelligence',
    title: 'AI only where it helps',
    intro:
      'Navigation, PID control and safety are deliberately not AI: they are classical algorithms we can test. AI comes in at three places that need vision or flexibility.',
    principle: 'AI proposes, safety decides.',
    principleNote:
      'Every command from any model passes the safety supervisor on the Jetson, then the safety loop on the ESP32, before it reaches a motor.',
    cards: [
      {
        tag: 'Perception',
        title: 'YOLO sees people and pallets',
        body: 'A YOLO network (v8n or v11n) with four classes: person, pallet, forklift, obstacle, running TensorRT FP16 on the Jetson. The precise pallet pose comes mainly from an ArUco marker; YOLO is a second layer.',
        targets: [
          'Target: ≤ 30 ms per frame, ≥ 15 fps',
          'Target: mAP@0.5 ≥ 0.85',
          'Target: person recall ≥ 0.95',
        ],
      },
      {
        tag: 'Docking',
        title: 'RL fork insertion vs. a classical baseline',
        body: 'A PPO policy controls only the last ~40 cm: approaching the pallet and inserting the forks. Before it, we build a classical controller (visual servoing from ArUco) as the baseline the policy has to beat, so the project still works if RL runs late.',
        targets: [
          'Target: ≥ 2 million training steps with domain randomization',
          'Target in simulation: ≥ 95% success over 1,000 cases',
          'Real-world comparison: 30 RL attempts vs. 30 classical',
        ],
      },
      {
        tag: 'Fleet',
        title: 'Task allocation across forklifts',
        body: 'Version one is a simple rule: the nearest forklift with enough battery. Then an optimiser (the Hungarian algorithm), or multi-agent RL as an advanced feature, all compared on mean task completion time.',
        targets: [
          'Step 1: nearest with enough battery',
          'Step 2: Hungarian algorithm',
          'Advanced: multi-agent RL',
        ],
      },
    ],
    journeyTitle: 'The model’s journey: from simulator to forklift',
    journey: [
      {
        title: 'Simulate',
        body: 'Gazebo for the full system; Gymnasium or Isaac Lab for fast training.',
      },
      {
        title: 'Train PPO',
        body: 'On a laptop GPU or Colab, with checkpoints and TensorBoard curves.',
      },
      {
        title: 'Validate',
        body: 'Measure the success rate on random cases in simulation before going real.',
      },
      { title: 'Export', body: 'ONNX, then TensorRT FP16. Target: ≤ 5 ms inference.' },
      {
        title: 'Deploy',
        body: 'On the Jetson at 20 Hz, every command routed through the safety supervisor.',
      },
      {
        title: 'Fine-tune',
        body: 'Log every run and retrain with versioned models you can roll back.',
      },
    ],
  },
  safety: {
    eyebrow: 'Safety',
    title: 'Safety in layers, each one working if the one above fails',
    intro:
      'No single layer is trusted. If the server fails the forklift stays safe; if the Jetson fails the ESP32 remains; if all software stops, the E-Stop remains.',
    headline: 'Target: ≤ 100 ms from detecting a hazard to cutting motion',
    layers: [
      {
        level: 'Layer 1 · hardware',
        title: 'E-Stop button',
        body: 'Cuts power to every motor immediately through the circuit itself, with no software.',
        rules: [
          'No software in the cut-off path',
          'Cuts the motor branch only; the processors keep logging and reporting',
          'Leaving E-Stop needs an explicit reset command',
        ],
      },
      {
        level: 'Layer 2 · ESP32',
        title: 'ToF ring and watchdog',
        body: 'A 1 kHz safety loop on its own core reads the ToF ring, limits and E-Stop, and works without the Jetson.',
        rules: [
          'Closer than 40 cm: speed capped at 30%',
          'Closer than 15 cm: full stop',
          'Stop when the Jetson heartbeat is missing for 500 ms',
          'Forks raised above 5 cm: ≤ 0.1 m/s',
        ],
      },
      {
        level: 'Layer 3 · Jetson',
        title: 'Safety supervisor and YOLO',
        body: 'Every command, from Nav2, the RL policy or the gamepad, passes a supervisor that enforces speed and acceleration limits.',
        rules: [
          'Person within 1 m of the path: slow down or stop',
          'Wi-Fi lost for over 3 s: finish the segment, then stop',
          'While docking: ≤ 0.1 m/s',
        ],
      },
      {
        level: 'Layer 4 · server',
        title: 'Aisle locks and stop-all',
        body: 'Each aisle segment is reserved for one forklift at a time, and the “Stop all” button is visible on every dashboard screen.',
        rules: [
          'One segment, one forklift',
          '“Stop all” within ≤ 1 s',
          'Battery under 15%: go charge; under 8%: safe stop',
        ],
      },
    ],
    ledsTitle: 'Forklift state on the LED ring',
    leds: [
      { colour: 'Green', meaning: 'normal' },
      { colour: 'Yellow', meaning: 'slowing or waiting' },
      { colour: 'Red with buzzer', meaning: 'stopped or fault' },
    ],
    footnote:
      'Every safety event is logged with time, forklift, cause and position, and shown on the dashboard. The numbers above are design limits and targets.',
  },
  fleet: {
    eyebrow: 'Fleet manager and dashboard',
    title: 'Aisles are a graph, and every segment has one owner',
    intro:
      'The server sees the warehouse as a graph of nodes and lanes. A forklift requests a segment before entering it and waits if it is taken, and the dashboard shows all of it live.',
    managerTitle: 'Fleet Manager and WMS',
    manager: [
      'A prioritised task queue; each task goes to exactly one forklift',
      'A* routing on a lane graph loaded from YAML',
      'Segment and intersection locks, with deadlock detection resolved by rerouting',
      'Reassigns a task when a forklift fails, and sends forklifts to charge automatically',
      'Moves a pallet in the database only when the forklift confirms the task is done',
      'A fleet simulator to test the server and dashboard before the forklifts are ready',
    ],
    dashboardTitle: 'Dashboard',
    dashboard: [
      'Live map: position, heading and path of each forklift, plus reserved segments',
      'A card per forklift: state, battery, task and last event',
      'Create, track and cancel tasks; inventory with SKU search',
      'Analytics: tasks per hour, timing, utilisation and a congestion heat map',
      'Event log, with a “Stop all” button always on screen',
      'Manual gamepad control with safety still active, in Arabic and English',
    ],
    mapLabel:
      'Illustrative lane graph: nodes and segments, one segment reserved by a forklift and another forklift waiting its turn',
    legend: {
      free: 'Free lane',
      locked: 'Reserved segment',
      waiting: 'Forklift waiting',
      robot: 'Forklift moving',
    },
    cta: 'Open dashboard',
  },
  specs: {
    eyebrow: 'Target specifications',
    title: 'The targets we will hold ourselves to',
    intro:
      'Design values from the requirements, to be revised after the first real test. Each target is tied to an acceptance test.',
    cols: { metric: 'Metric', target: 'Design target', test: 'How it is measured' },
    rows: [
      {
        id: 'NFR-01',
        metric: 'Localisation accuracy',
        target: '≤ 3 cm and ≤ 3°',
        test: 'T-08',
        method: '10 marked floor points',
      },
      {
        id: 'NFR-02',
        metric: 'Docking accuracy',
        target: '≤ 1 cm lateral, ≤ 2°',
        test: 'T-10 · T-12',
        method: 'ArUco pose checks and docking attempts',
      },
      {
        id: 'NFR-03',
        metric: 'Top speed',
        target: '0.3 m/s',
        test: 'T-06',
        method: 'safety test at this speed',
      },
      {
        id: 'NFR-04',
        metric: 'Stop time on a hazard',
        target: '≤ 100 ms',
        test: 'T-06',
        method: '20 sudden obstacles',
      },
      {
        id: 'NFR-05',
        metric: 'Runtime per charge',
        target: '≥ 45 min',
        test: 'T-15',
        method: 'run to low battery',
      },
      {
        id: 'NFR-06',
        metric: 'Task success rate',
        target: '≥ 90% unassisted',
        test: 'T-13',
        method: '20 transport tasks from the dashboard',
      },
      {
        id: 'NFR-07',
        metric: 'Server link latency',
        target: '≤ 200 ms',
        test: 'CM-04',
        method: 'MQTT message timestamps',
      },
    ],
    footnote:
      'These are targets, not results. Actual results are recorded in the test log (date, outcome, notes) and will be added here once complete.',
  },
  plan: {
    eyebrow: 'Plan',
    title: 'Six phases, each with a test gate',
    intro:
      'A phase starts only after the previous phase’s tests pass, so early mistakes do not pile up.',
    phaseLabel: 'Phase',
    gateLabel: 'Test gate',
    phases: [
      {
        title: 'Single parts',
        body: 'Open one forklift and document its motors, then power, every sensor reading, and speed and lift PID on the ESP32.',
        gate: 'T-01 – T-04',
      },
      {
        title: 'A forklift that moves safely',
        body: 'Odometry, the ToF safety loop, and the watchdog when the Jetson goes silent.',
        gate: 'T-05 – T-07',
      },
      {
        title: 'Map and navigation',
        body: 'Map the warehouse with slam_toolbox, localise on it, and plan paths with Nav2.',
        gate: 'T-08 · T-09',
      },
      {
        title: 'Perception and docking',
        body: 'ArUco and YOLO, then classical docking, then the RL policy compared against it.',
        gate: 'T-10 – T-12',
      },
      {
        title: 'Full fleet',
        body: 'Build the other two forklifts, run full tasks from the dashboard, then three forklifts together.',
        gate: 'T-13 · T-14',
      },
      {
        title: 'Endurance and readiness',
        body: 'Run to low battery, test network loss, and prepare the final demo.',
        gate: 'T-15 · T-16',
      },
    ],
    parallelNote:
      'Phases 1 to 4 run on one forklift. The server and dashboard start in parallel from phase 2, using the fleet simulator.',
  },
  bom: {
    eyebrow: 'Parts list',
    title: 'What does one forklift cost?',
    intro:
      'An estimate from the selected parts list, per forklift, in Iraqi dinars. Prices can change.',
    groups: [
      { name: 'Compute', items: 'Jetson Orin Nano Super · 256 GB NVMe SSD · ESP32-S3 Zero' },
      {
        name: 'Vision and motion sensing',
        items: 'RPLIDAR C1 · Camera Module 3 · 6× VL53L1X · IMU',
      },
      { name: 'Fork and wheel sensing', items: 'AS5600 · 2× TCRT5000 · 2× limit · pot · TCA9548A' },
      { name: 'Power', items: '4× 18650 · 2S BMS · XL4015 buck · INA219 · TXS0108E' },
      {
        name: 'Actuation and signalling',
        items: '2× MX1508 · MG90S servo · E-Stop · WS2812 · buzzer',
      },
    ],
    currency: 'IQD',
    totalLabel: 'Total per forklift',
    fleetLabel: 'Fleet estimate (3 + 1 spare)',
    fleetNote: '4 × the cost of one forklift',
    shareNote: 'The Jetson alone is about two thirds of a forklift’s cost.',
    excluded:
      'Not included: the Huina 1577 Pro forklift itself, the 12 V boost converter for the Jetson, the 3D-printed mounts, and the shared fleet charger.',
    chartLabel: 'Cost of one forklift by parts group',
  },
  stack: {
    eyebrow: 'Tech stack',
    title: 'What we build with',
    groups: ['Firmware', 'Forklift', 'AI', 'Server', 'Dashboard', 'Design and hardware'],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions before you ask',
    items: [
      {
        q: 'Is this a finished product?',
        a: 'No. It is a graduation project in progress. Every number on this page is a design target from the requirements; results will be added after testing.',
      },
      {
        q: 'Why 1:14 scale?',
        a: 'It fits a whole warehouse, with aisles and racks, in one room, using RC forklifts that have a real drive motor and lift mechanism, at a cost a student project can carry.',
      },
      {
        q: 'What happens if Wi-Fi drops or the Jetson fails?',
        a: 'If Wi-Fi is lost for more than 3 seconds, the forklift finishes its current segment, then stops and waits. If the Jetson heartbeat is missing for more than 500 ms, the ESP32 stops it on its own. And the E-Stop works with no software at all.',
      },
      {
        q: 'Why not make everything AI?',
        a: 'Navigation, control and safety need predictable behaviour that can be tested. AI is used where it helps: vision, fork insertion and task allocation, and every suggestion it makes passes the safety supervisor.',
      },
      {
        q: 'How does the forklift find the exact pallet position?',
        a: 'From an ArUco marker on the pallet face, which the camera reads to compute its pose. YOLO detects unmarked pallets as a second layer, and a TCRT5000 on each fork tip confirms insertion.',
      },
      {
        q: 'Can a fourth forklift be added?',
        a: 'That is one of the goals: the same firmware on every forklift with an ID stored on each, so adding one is configuration only, with no code changes.',
      },
      {
        q: 'Where can I see the system?',
        a: 'The dashboard is the window into the system: live map, tasks and events. The “Open dashboard” button opens it when the server is running on the local network.',
      },
    ],
  },
  cta: {
    title: 'Follow the warehouse as it is built',
    body: 'The dashboard shows the fleet, the tasks and the events. Open it to see where the project stands.',
    primary: 'Open dashboard',
    secondary: 'How it works',
  },
  footer: {
    tagline: 'A 1:14-scale warehouse and an autonomous forklift fleet. A graduation project.',
    honesty: 'Work in progress: every number is a design target, not a measured result.',
    sectionsTitle: 'Sections',
    teamTitle: 'Team',
    // TODO(team): add the real team member names, supervisor, university and department.
    team: { members: [], supervisor: null, university: null, department: null },
    supervisorLabel: 'Supervised by',
    teamPending: 'Team, supervisor and university names will be added soon.',
    rights: '© 2026 The project team',
  },
  notFound: {
    title: 'This page does not exist',
    body: 'The link may have changed. The home page has everything about the project.',
    back: 'Back to the home page',
  },
};
