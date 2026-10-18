# Suggested self-parking project media

Add these when available, using original project output rather than illustrative results that could be mistaken for measured output.

1. **A labeled bird's-eye-view image:** show a real input and its corresponding parking-space labels side by side. Caption what the labels mean.
2. **A model prediction example:** input, ground-truth labels, and actual ResNet-50 output, including an imperfect result if available. Explain the output representation without claiming unmeasured accuracy.
3. **A short CARLA data-generation clip:** show the simulation and captured images. Use a compressed MP4 below Cloudflare Pages' 25 MiB per-file limit, ideally below 20 MiB.
4. **A pipeline diagram:** CARLA → C++ capture/labeling → dataset → preprocessing/training → ResNet-50 output. Add actual module names once verified.
5. **An evaluation figure, only if available:** validation loss or precision/recall with the dataset split and evaluation method. Training curves alone do not establish test accuracy.

The website now has a dedicated project page at `projects/SelfParking/index.html` with the existing simulation image and click-to-preview gallery. Place new assets under `projects/SelfParking/media/`, add descriptive captions/alt text, and run `npm run check` and `npm run build`.
