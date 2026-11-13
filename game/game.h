#ifndef ITOSHI_RIN_GAME_H
#define ITOSHI_RIN_GAME_H

#include <raylib.h>
#include <raymath.h>
#include <vector>
#include <string>
#include <memory>

namespace rin_game {

// Visual color palette matching Itoshi Rin aesthetic
namespace colors {
    inline const Color Background   = { 7, 9, 14, 255 };       // #07090e
    inline const Color DarkTeal     = { 13, 43, 42, 255 };     // #0d2b2a
    inline const Color NeonCyan     = { 0, 255, 200, 255 };    // #00ffc8
    inline const Color DeepCyan     = { 0, 180, 160, 255 };
    inline const Color GlowAura     = { 0, 240, 255, 120 };
    inline const Color Crimson      = { 255, 42, 95, 255 };    // #ff2a5f
    inline const Color GoalWhite    = { 240, 245, 255, 255 };
    inline const Color DefenderDark = { 20, 28, 45, 240 };
    inline const Color DefenderGlow = { 100, 140, 200, 255 };
    inline const Color PostSilver   = { 200, 215, 230, 255 };
}

enum class GameState {
    Menu,
    Aiming,
    BallInFlight,
    GoalScored,
    ShotBlocked,
    GameOver
};

struct Particle {
    Vector2 position{0.0f, 0.0f};
    Vector2 velocity{0.0f, 0.0f};
    Color color{colors::NeonCyan};
    float radius{4.0f};
    float alpha{1.0f};
    float decay{2.5f};
    bool active{false};
};

class ParticleSystem {
public:
    explicit ParticleSystem(size_t maxParticles = 800);
    void Emit(Vector2 pos, Vector2 vel, Color col, float size, float decay);
    void EmitBurst(Vector2 pos, int count, Color col, float speed);
    void Update(float dt);
    void Draw() const;
    void Clear();

private:
    std::vector<Particle> particles_;
};

struct TrailPoint {
    Vector2 pos;
    float alpha;
    float radius;
    float spin;
};

class Ball {
public:
    Ball();
    void Reset(Vector2 spawnPos);
    void Launch(Vector2 initialVelocity, float initialSpin);
    void Update(float dt, bool isFlowActive);
    void Draw(bool isFlowActive) const;

    Vector2 GetPosition() const noexcept { return position_; }
    Vector2 GetVelocity() const noexcept { return velocity_; }
    float GetRadius() const noexcept { return radius_; }
    float GetSpin() const noexcept { return spin_; }
    bool IsMoving() const noexcept { return isMoving_; }
    void Stop() noexcept { isMoving_ = false; }
    void Deflect(Vector2 normal, float restitution = 0.55f);

private:
    Vector2 position_{ 0.0f, 0.0f };
    Vector2 velocity_{ 0.0f, 0.0f };
    float spin_{ 0.0f }; // Angular speed: positive = curve right, negative = curve left
    float radius_{ 11.0f };
    bool isMoving_{ false };
    float rotationAngle_{ 0.0f };
    std::vector<TrailPoint> trail_;
};

struct Goal {
    Rectangle rect;          // Goal scoring zone
    Vector2 leftPost;
    Vector2 rightPost;
    float crossbarY;
    float postRadius{ 7.0f };
    
    void Draw() const;
};

class Goalkeeper {
public:
    Goalkeeper();
    void Reset(Vector2 centerPos, float patrolWidth);
    void Update(float dt, Vector2 ballPos, Vector2 ballVel, bool ballInFlight);
    void Draw() const;
    bool CheckSave(Vector2 ballPos, float ballRadius);

    Vector2 GetPosition() const noexcept { return position_; }
    Rectangle GetBounds() const;

private:
    Vector2 position_{ 0.0f, 0.0f };
    Vector2 basePos_{ 0.0f, 0.0f };
    float patrolWidth_{ 170.0f };
    float speed_{ 310.0f };
    float diveTimer_{ 0.0f };
    bool isDiving_{ false };
    Vector2 diveTarget_{ 0.0f, 0.0f };
    float width_{ 38.0f };
    float height_{ 68.0f };
};

class Defender {
public:
    Defender(Vector2 pos, float patrolRange, float speed, bool movesVertical = false);
    void Update(float dt);
    void Draw() const;
    bool CheckBlock(Vector2 ballPos, float ballRadius);

private:
    Vector2 basePos_;
    Vector2 currentPos_;
    float patrolRange_;
    float speed_;
    float timer_{ 0.0f };
    bool movesVertical_{ false };
    float width_{ 30.0f };
    float height_{ 64.0f };
};

class GameEngine {
public:
    GameEngine(int screenWidth, int screenHeight);
    ~GameEngine() = default;

    void Initialize();
    void ProcessInput();
    void Update(float dt);
    void Render() const;

    bool ShouldClose() const;

private:
    void ResetShot();
    void CalculateTrajectoryPreview();
    void ActivateFlowState();

    int screenWidth_;
    int screenHeight_;

    GameState state_{ GameState::Aiming };

    // Game objects
    Ball ball_;
    Goal goal_;
    Goalkeeper goalkeeper_;
    std::vector<Defender> defenders_;
    ParticleSystem particles_;

    // Player controls
    Vector2 ballSpawnPos_{ 0.0f, 0.0f };
    Vector2 aimVector_{ 0.0f, 0.0f };
    float shotPower_{ 0.0f };
    float maxPower_{ 950.0f };
    float currentSpin_{ 0.0f };      // Regulated by A/D or Q/E
    float maxSpin_{ 480.0f };
    bool isDragging_{ false };
    Vector2 dragStart_{ 0.0f, 0.0f };

    // Trajectory calculation preview points
    std::vector<Vector2> trajectoryPreview_;

    // Flow State mechanics
    float flowGauge_{ 0.0f };        // 0.0f to 100.0f
    bool isFlowActive_{ false };
    float flowDurationTimer_{ 0.0f };
    float maxFlowDuration_{ 7.0f };

    // Scoring & Stats
    int goalsScored_{ 0 };
    int totalShots_{ 0 };
    int comboStreak_{ 0 };
    int bestStreak_{ 0 };
    float shotResultTimer_{ 0.0f };
    std::string rinQuote_{ "«Розрахуй траєкторію знищення. Удар без підкрутки — це просто тепла вода.»" };
};

} // namespace rin_game

#endif // ITOSHI_RIN_GAME_H
