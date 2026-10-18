# GitHub updates to apply

Prepared October 18, 2026. The public profile README was read directly; repository internals were not audited in this update. These are ready-to-use copy and recommended changes, not published GitHub edits.

## Profile

Replace the complete body of `george536/george536/README.md` with `docs/github-profile-README.md` from this portfolio repository.

Replace the bio with:

> Backend software engineer at SOTI | Co-founder & lead engineer at Trac | C#/.NET, Python, SQL, Firebase

Keep the website as `https://georgeyazji.com/`. Use Toronto, Ontario, Canada for location consistency.

## Suggested pins

1. `portfolio`
2. `Self-Parking-Car` after scope/documentation cleanup
3. `RC-Car-Project`
4. `Splines-and-3D-lines-Library-for-Unreal-Engine-4` after README cleanup

Use four strong pins rather than filling every slot. Unpin the profile configuration repository, Turtle Graphics exercise, and the COVID screener fork. Keep the older repositories available. Splines remains a GitHub project only; it was intentionally removed from the website.

## Repository descriptions: complete replacement text

**portfolio**

> George Yazji's backend engineering portfolio: production systems at SOTI, Trac real-time telemetry, database integrations, reliability, and applied ML.

**Self-Parking-Car**

> CARLA data pipeline and PyTorch/ResNet-50 parking-space detection project using 10,000+ labeled bird's-eye-view images.

**RC-Car-Project**

> OpenCV/PID path following and Gipps car-following across 4 Raspberry Pi vehicles over MQTT, achieving 90–95% path following and 5–10 cm gaps.

**Splines-and-3D-lines-Library-for-Unreal-Engine-4**

> Reusable C++ spline-mesh and 3D-line utilities for Unreal Engine, suitable for roads, borders, trajectories, and continuous path visualization.

**Boxing-Robot**

> Raspberry Pi boxing-training robot with Python/Tkinter controls, servo-driven arms, programmable combinations, and timed practice modes.

## Self-Parking-Car: README body

The following is a replacement overview based on the confirmed scope. Add verified setup commands and a folder map only after inspecting the repository; do not invent compatibility versions or commands.

```markdown
# Parking-Space Detection in CARLA

A C++ data-generation pipeline and PyTorch vision model for parking-space detection in simulation.

## Completed work

- Built a C++ pipeline in CARLA to generate and label 10,000+ bird's-eye-view training images.
- Developed a ResNet-50 model in PyTorch for parking-space detection.

## Processing flow

CARLA simulation → C++ image generation and labeling → training dataset → PyTorch ResNet-50 parking-space detection.

## Scope and limitations

The completed scope covers training-data generation and parking-space detection. The planned reinforcement-learning phase for autonomous parking was not completed. No measured model-accuracy result is published here.

## Technologies

C++ · CARLA · Python · PyTorch · ResNet-50

## More work

[Portfolio](https://georgeyazji.com/) · [GitHub profile](https://github.com/george536)
```

Before publishing this body, review any NDA/proprietary content flagged in the existing README. Confirm ownership and remove sensitive material if present; deleting a warning alone does not resolve confidentiality. This draft does not verify or assert an actual NDA violation.

## Remaining repository documentation

- **Self-Parking-Car:** add verified environment/setup instructions, folder map, labeling workflow, sample images, and training/inference commands. Include dataset splits and evaluation only if measured.
- **RC-Car-Project:** document hardware, MQTT flow, controller tuning, and the conditions used to measure path-following accuracy and following gaps.
- **Splines:** correct grammar; add verified Unreal compatibility, installation, one API example, screenshots, and an appropriate license only after confirming ownership/licensing intent.
- **Boxing Robot:** document the problem, hardware, Python/Tkinter architecture, training modes, setup, screenshots, and portfolio link.
- Strongest backend work is proprietary. Consider a new independent backend reference project or an owned reusable component; do not publish employer or Trac code without the relevant rights.

LinkedIn is intentionally deferred.
