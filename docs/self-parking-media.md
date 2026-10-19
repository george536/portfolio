# Suggested self-parking project media

## Added October 18, 2026

Gallery revision: removed the green top-down vehicle preview from the displayed gallery. The existing CARLA image is first, captioned "Captured image", followed by "Live bird's-eye view", "Bird's-eye view calibration tool", and "Image captures across vehicle rotations and displacements". The original uploaded files are retained in Git.

Four supplied development screenshots now illustrate the top-down vehicle view, stitched camera/alignment preview, camera and bird's-eye calibration controls, and captured image sequence with a transforms file. They are captioned as development/capture evidence, not model predictions or ground-truth label visualizations. Original screenshots are preserved under `projects/SelfParking/media/`.

For a future polish pass, original image exports would be cleaner than the File Explorer and screenshot-editor captures. A ground-truth/prediction comparison and a short capture demo would add the most new evidence.

Add these when available, using original project output rather than illustrative results that could be mistaken for measured output.

1. **A labeled bird's-eye-view image:** show a real input and its corresponding parking-space labels side by side. Caption what the labels mean.
2. **A model prediction example:** input, ground-truth labels, and actual ResNet-50 output, including an imperfect result if available. Explain the output representation without claiming unmeasured accuracy.
3. **A short CARLA data-generation clip:** show the simulation and captured images. Use a compressed MP4 below Cloudflare Pages' 25 MiB per-file limit, ideally below 20 MiB.
4. **A pipeline diagram:** CARLA → C++ capture/labeling → dataset → preprocessing/training → ResNet-50 output. Add actual module names once verified.
5. **An evaluation figure, only if available:** validation loss or precision/recall with the dataset split and evaluation method. Training curves alone do not establish test accuracy.

The website now has a dedicated project page at `projects/SelfParking/index.html` with the existing simulation image and click-to-preview gallery. Place new assets under `projects/SelfParking/media/`, add descriptive captions/alt text, and run `npm run check` and `npm run build`.
