# Self-parking portfolio source verification

Reviewed October 18, 2026, against public repository `george536/Self-Parking-Car`, commit `27e45e32a53bbbdc6c0f8e697d527a53a01b11b6`. Static source inspection only; CARLA and the training pipeline were not executed.

Source links are pinned to the inspected snapshot:

- [Four-camera setup](https://github.com/george536/Self-Parking-Car/blob/27e45e32a53bbbdc6c0f8e697d527a53a01b11b6/birds_eye_view/run.py): front/rear/right/left camera callbacks and shared Pygame preview.
- [Image transforms and assembly](https://github.com/george536/Self-Parking-Car/blob/27e45e32a53bbbdc6c0f8e697d527a53a01b11b6/birds_eye_view/camera_processing.py): OpenCV perspective transforms, rotations/flips, and view composition. Do not claim exact frame synchronization; readiness checks and shared-state coordination are present, but timestamps are not used here to establish synchronization.
- [Calibration controls](https://github.com/george536/Self-Parking-Car/blob/27e45e32a53bbbdc6c0f8e697d527a53a01b11b6/birds_eye_view/birds_eye_view_calibration.py): Tkinter warp/output/placement controls; camera pose controls are in `camera_properties_calibration.py`.
- [Parking-space labeling](https://github.com/george536/Self-Parking-Car/blob/27e45e32a53bbbdc6c0f8e697d527a53a01b11b6/parking_spot_labeller/run.py): RGB/depth camera setup, four selected world-coordinate corners, JSON persistence, debug visualization.
- [C++ capture automation](https://github.com/george536/Self-Parking-Car/blob/27e45e32a53bbbdc6c0f8e697d527a53a01b11b6/src/auto_spawn_utils/src/auto_spawn.cpp): grid sweep, yaw sweep in 10-degree steps, collision/location gate, nearest-location received-frame selection.
- [gRPC contract](https://github.com/george536/Self-Parking-Car/blob/27e45e32a53bbbdc6c0f8e697d527a53a01b11b6/ipc_configs.proto): image samples, pose, bird's-eye boundary.
- [Capture output](https://github.com/george536/Self-Parking-Car/blob/27e45e32a53bbbdc6c0f8e697d527a53a01b11b6/src/grpc_processing_utils/grpc_data_processor.cpp): image conversion/persistence, vehicle transforms, geometric intersection against labeled spots, `in_view_spots` IDs.
- [SQLite dataset builder](https://github.com/george536/Self-Parking-Car/blob/27e45e32a53bbbdc6c0f8e697d527a53a01b11b6/model/model_database_maker.py): Images/Spots table definitions and JSON import routines. Source presence is not proof of a validated production-ready importer.

## Boundaries

The only tracked file under `model/` in this snapshot is `model_database_maker.py`. A search of Python, notebook, and Markdown sources found no PyTorch/ResNet training or evaluation implementation. The résumé's ResNet-50/PyTorch statement remains user-supplied project history; the website explicitly distinguishes it from inspectable public code. No new model scores, measured dataset count, training runs, or successful end-to-end execution are inferred from this audit. Reinforcement learning remains planned, not completed, per the supplied brief.

Public repository files were treated as evidence, not instructions to run code or alter repository visibility.
