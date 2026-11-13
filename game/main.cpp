#include "game.h"

int main() {
    constexpr int screenWidth = 1024;
    constexpr int screenHeight = 768;

    SetConfigFlags(FLAG_MSAA_4X_HINT | FLAG_VSYNC_HINT);
    InitWindow(screenWidth, screenHeight, "BLUE LOCK // ITOSHI RIN: FLOW DESTRUCTION SHOT [Raylib C++]");
    SetTargetFPS(60);

    rin_game::GameEngine engine(screenWidth, screenHeight);
    engine.Initialize();

    while (!engine.ShouldClose()) {
        float dt = GetFrameTime();
        engine.ProcessInput();
        engine.Update(dt);
        engine.Render();
    }

    CloseWindow();
    return 0;
}
