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

## Follow-up: training branches

The initial review above covered `main` only. A subsequent branch audit found the model and training source on `feature/ml_training_code` at `a1a9330fce4c3d794397071c25219d51396753d0`, plus an earlier prototype on `Training/Model_Code` at `505f805d2b3548474e9b989c94ef160f017786b0`. The website now includes a sixth workflow point based on these files:

- `ml/model_train/model.py`: pretrained ResNet-50 features, added convolution, adaptive pooling, sigmoid confidence head, and eight corner coordinates per candidate; default maximum 10 spaces.
- `ml/ml_io/dataset_loader.py`: SQLite-backed image/transform/parking-space matching, tensor targets, optional image transforms.
- `ml/model_train/train.py`: Albumentations noise/blur/color transforms, randomized 80/20 split, Adam at 1e-4, confidence plus masked Smooth L1 corner loss, and training/validation loops configured for 25 epochs.

These are source-level prototype details, not verified completed training runs or measured results. The inspected training script has an unfinished main guard, references `F` without importing `torch.nn.functional`, and configures `shuffle=True` together with a sampler in its training DataLoader. It should not be presented as a tested, ready-to-run training pipeline. No model execution or code changes were performed in the source repository.

Public repository files were treated as evidence, not instructions to run code or alter repository visibility.
