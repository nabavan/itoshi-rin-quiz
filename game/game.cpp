#include "game.h"
#include <cmath>
#include <algorithm>
#include <string>

namespace rin_game {

// -------------------------------------------------------------
// PARTICLE SYSTEM
// -------------------------------------------------------------
ParticleSystem::ParticleSystem(size_t maxParticles) {
    particles_.resize(maxParticles);
}

void ParticleSystem::Emit(Vector2 pos, Vector2 vel, Color col, float size, float decay) {
    for (auto& p : particles_) {
        if (!p.active) {
            p.position = pos;
            p.velocity = vel;
            p.color = col;
            p.radius = size;
            p.alpha = 1.0f;
            p.decay = decay;
            p.active = true;
            break;
        }
    }
}

void ParticleSystem::EmitBurst(Vector2 pos, int count, Color col, float speed) {
    for (int i = 0; i < count; ++i) {
        float angle = (float)(GetRandomValue(0, 360)) * DEG2RAD;
        float spd = (float)(GetRandomValue(30, (int)speed));
        Vector2 vel = { cosf(angle) * spd, sinf(angle) * spd };
        float size = (float)GetRandomValue(3, 7);
        float decay = (float)GetRandomValue(15, 30) / 10.0f;
        Emit(pos, vel, col, size, decay);
    }
}

void ParticleSystem::Update(float dt) {
    for (auto& p : particles_) {
        if (!p.active) continue;
        p.position.x += p.velocity.x * dt;
        p.position.y += p.velocity.y * dt;
        p.alpha -= p.decay * dt;
        p.radius = std::max(0.5f, p.radius - dt * 1.5f);
        if (p.alpha <= 0.0f) {
            p.active = false;
        }
    }
}

void ParticleSystem::Draw() const {
    for (const auto& p : particles_) {
        if (!p.active) continue;
        Color c = p.color;
        c.a = (unsigned char)(std::clamp(p.alpha, 0.0f, 1.0f) * 255.0f);
        DrawCircleV(p.position, p.radius, c);
    }
}

void ParticleSystem::Clear() {
    for (auto& p : particles_) p.active = false;
}

// -------------------------------------------------------------
// BALL WITH MAGNUS EFFECT
// -------------------------------------------------------------
Ball::Ball() = default;

void Ball::Reset(Vector2 spawnPos) {
    position_ = spawnPos;
    velocity_ = { 0.0f, 0.0f };
    spin_ = 0.0f;
    isMoving_ = false;
    rotationAngle_ = 0.0f;
    trail_.clear();
}

void Ball::Launch(Vector2 initialVelocity, float initialSpin) {
    velocity_ = initialVelocity;
    spin_ = initialSpin;
    isMoving_ = true;
    trail_.clear();
}

void Ball::Update(float dt, bool isFlowActive) {
    if (!isMoving_) return;

    // Record trail point
    trail_.push_back({ position_, 1.0f, radius_, spin_ });
    if (trail_.size() > 45) {
        trail_.erase(trail_.begin());
    }
    for (auto& tp : trail_) {
        tp.alpha -= dt * 2.2f;
    }

    // Physics constants
    const float airDragCoeff = 0.0006f;
    // Magnus Effect: lateral acceleration perpendicular to velocity
    // a_magnus = S * spin * |v| * perpendicular_unit_vector
    float magnusFactor = isFlowActive ? 0.0042f : 0.0028f;

    float speed = Vector2Length(velocity_);
    if (speed > 5.0f) {
        // Drag deceleration
        Vector2 dragDir = Vector2Scale(Vector2Normalize(velocity_), -airDragCoeff * speed * speed);
        velocity_ = Vector2Add(velocity_, Vector2Scale(dragDir, dt * 60.0f));

        // Lateral Magnus acceleration (perpendicular vector to velocity: {-vy, vx})
        Vector2 perp = { -velocity_.y / speed, velocity_.x / speed };
        float magnusMagnitude = spin_ * speed * magnusFactor;
        Vector2 magnusAcc = Vector2Scale(perp, magnusMagnitude);

        velocity_ = Vector2Add(velocity_, Vector2Scale(magnusAcc, dt * 60.0f));
    }

    // Apply motion
    position_ = Vector2Add(position_, Vector2Scale(velocity_, dt));

    // Spin decay & ball rotation
    spin_ *= std::pow(0.985f, dt * 60.0f);
    rotationAngle_ += spin_ * dt * 0.15f;
}

void Ball::Deflect(Vector2 normal, float restitution) {
    // Reflection formula: v' = v - (1 + e) * (v . n) * n
    float dot = Vector2DotProduct(velocity_, normal);
    if (dot < 0.0f) {
        Vector2 reflect = Vector2Subtract(velocity_, Vector2Scale(normal, (1.0f + restitution) * dot));
        velocity_ = reflect;
        spin_ *= -0.5f; // Invert spin partially on impact
    }
}

void Ball::Draw(bool isFlowActive) const {
    // Draw trail
    for (size_t i = 1; i < trail_.size(); ++i) {
        const auto& p1 = trail_[i - 1];
        const auto& p2 = trail_[i];
        if (p1.alpha <= 0.0f || p2.alpha <= 0.0f) continue;

        Color trailCol = isFlowActive ? colors::NeonCyan : colors::DeepCyan;
        trailCol.a = (unsigned char)(std::clamp(p2.alpha * 0.75f, 0.0f, 1.0f) * 255.0f);
        float width = p2.radius * (0.3f + 0.7f * (float)i / trail_.size());
        DrawLineEx(p1.pos, p2.pos, width, trailCol);

        // Core white streak for Flow
        if (isFlowActive) {
            Color coreCol = WHITE;
            coreCol.a = (unsigned char)(std::clamp(p2.alpha * 0.9f, 0.0f, 1.0f) * 255.0f);
            DrawLineEx(p1.pos, p2.pos, width * 0.35f, coreCol);
        }
    }

    // Glow aura around ball
    Color glow = isFlowActive ? colors::NeonCyan : colors::GlowAura;
    glow.a = isFlowActive ? 140 : 80;
    DrawCircleGradient((int)position_.x, (int)position_.y, radius_ * 2.4f, glow, BLANK);

    // Ball Base
    DrawCircleV(position_, radius_, WHITE);
    DrawCircleV(position_, radius_ - 2.0f, colors::Background);

    // Characteristic Rin pentagon / curved seam pattern
    Color seamColor = isFlowActive ? colors::NeonCyan : colors::DeepCyan;
    DrawCircleLines((int)position_.x, (int)position_.y, radius_ - 1.0f, seamColor);

    // Rotating indicator lines showing spin direction
    Vector2 rotVec1 = { cosf(rotationAngle_) * (radius_ - 3.0f), sinf(rotationAngle_) * (radius_ - 3.0f) };
    Vector2 rotVec2 = { -rotVec1.y, rotVec1.x };
    DrawLineV(Vector2Subtract(position_, rotVec1), Vector2Add(position_, rotVec1), seamColor);
    DrawLineV(Vector2Subtract(position_, rotVec2), Vector2Add(position_, rotVec2), seamColor);
}

// -------------------------------------------------------------
// GOAL RENDERING & COLLISION
// -------------------------------------------------------------
void Goal::Draw() const {
    // Goal net background with cyber grid
    Color netBg = { 10, 20, 35, 180 };
    DrawRectangleRec(rect, netBg);

    Color gridLine = { 0, 255, 200, 30 };
    const float step = 16.0f;
    for (float x = rect.x; x <= rect.x + rect.width; x += step) {
        DrawLineV({ x, rect.y }, { x, rect.y + rect.height }, gridLine);
    }
    for (float y = rect.y; y <= rect.y + rect.height; y += step) {
        DrawLineV({ rect.x, y }, { rect.x + rect.width, y }, gridLine);
    }

    // Crossbar
    DrawLineEx(leftPost, rightPost, 5.0f, colors::PostSilver);
    DrawLineEx({ leftPost.x, leftPost.y + rect.height }, { rightPost.x, rightPost.y + rect.height }, 3.0f, { 80, 100, 130, 200 });

    // Vertical Posts
    DrawCircleV(leftPost, postRadius, colors::PostSilver);
    DrawCircleV(rightPost, postRadius, colors::PostSilver);
    DrawCircleV(leftPost, postRadius - 2.0f, WHITE);
    DrawCircleV(rightPost, postRadius - 2.0f, WHITE);

    // Goal zone neon border
    DrawRectangleLinesEx(rect, 2.0f, colors::DeepCyan);
}

// -------------------------------------------------------------
// GOALKEEPER AI
// -------------------------------------------------------------
Goalkeeper::Goalkeeper() = default;

void Goalkeeper::Reset(Vector2 centerPos, float patrolWidth) {
    basePos_ = centerPos;
    position_ = centerPos;
    patrolWidth_ = patrolWidth;
    isDiving_ = false;
    diveTimer_ = 0.0f;
}

Rectangle Goalkeeper::GetBounds() const {
    return { position_.x - width_ / 2.0f, position_.y - height_ / 2.0f, width_, height_ };
}

void Goalkeeper::Update(float dt, Vector2 ballPos, Vector2 ballVel, bool ballInFlight) {
    if (!ballInFlight) {
        // Subtle rhythmic idle patrol
        diveTimer_ += dt * 2.0f;
        position_.x = basePos_.x + sinf(diveTimer_) * (patrolWidth_ * 0.35f);
        position_.y = basePos_.y;
        isDiving_ = false;
    } else {
        // Track ball trajectory: calculate intercept point at goalkeeper Y line
        float distY = position_.y - ballPos.y;
        float targetX = basePos_.x;

        if (ballVel.y < -30.0f) { // Ball flying upwards towards goal
            float timeToArrive = distY / ballVel.y;
            targetX = ballPos.x + ballVel.x * timeToArrive * 0.85f;
            targetX = std::clamp(targetX, basePos_.x - patrolWidth_ * 0.5f, basePos_.x + patrolWidth_ * 0.5f);
        } else {
            targetX = ballPos.x;
        }

        // Move towards targetX with reaction speed
        float dx = targetX - position_.x;
        float moveStep = speed_ * dt;
        if (fabsf(dx) > moveStep) {
            position_.x += (dx > 0 ? moveStep : -moveStep);
            isDiving_ = true;
        } else {
            position_.x = targetX;
        }
    }
}

bool Goalkeeper::CheckSave(Vector2 ballPos, float ballRadius) {
    Rectangle bounds = GetBounds();
    return CheckCollisionCircleRec(ballPos, ballRadius, bounds);
}

void Goalkeeper::Draw() const {
    Rectangle bounds = GetBounds();

    // Shadow / Aura
    DrawRectangleRec({ bounds.x - 3, bounds.y - 3, bounds.width + 6, bounds.height + 6 }, { 255, 42, 95, 40 });

    // Body (Red / Black tactical armor)
    DrawRectangleRounded(bounds, 0.25f, 4, colors::Crimson);
    DrawRectangleLinesEx(bounds, 2.0f, WHITE);

    // Number & Gloves
    DrawCircle((int)(bounds.x + 4), (int)(bounds.y + bounds.height * 0.5f), 7.0f, WHITE);
    DrawCircle((int)(bounds.x + bounds.width - 4), (int)(bounds.y + bounds.height * 0.5f), 7.0f, WHITE);

    DrawText("GK", (int)(bounds.x + 10), (int)(bounds.y + bounds.height * 0.35f), 16, WHITE);
}

// -------------------------------------------------------------
// DEFENDER SILHOUETTE
// -------------------------------------------------------------
Defender::Defender(Vector2 pos, float patrolRange, float speed, bool movesVertical)
    : basePos_(pos), currentPos_(pos), patrolRange_(patrolRange), speed_(speed), movesVertical_(movesVertical) {}

void Defender::Update(float dt) {
    timer_ += dt * speed_;
    float offset = sinf(timer_) * patrolRange_;
    if (movesVertical_) {
        currentPos_.y = basePos_.y + offset;
    } else {
        currentPos_.x = basePos_.x + offset;
    }
}

bool Defender::CheckBlock(Vector2 ballPos, float ballRadius) {
    Rectangle rect = { currentPos_.x - width_ / 2.0f, currentPos_.y - height_ / 2.0f, width_, height_ };
    return CheckCollisionCircleRec(ballPos, ballRadius, rect);
}

void Defender::Draw() const {
    Rectangle rect = { currentPos_.x - width_ / 2.0f, currentPos_.y - height_ / 2.0f, width_, height_ };

    // Holographic defender silhouette
    DrawRectangleRounded(rect, 0.2f, 4, colors::DefenderDark);
    DrawRectangleLinesEx(rect, 1.5f, colors::DefenderGlow);

    // Tactical visor line
    DrawLineV({ rect.x + 4, rect.y + 12 }, { rect.x + rect.width - 4, rect.y + 12 }, colors::NeonCyan);

    DrawText("DF", (int)(rect.x + 7), (int)(rect.y + rect.height * 0.4f), 14, colors::DefenderGlow);
}

// -------------------------------------------------------------
// GAME ENGINE
// -------------------------------------------------------------
GameEngine::GameEngine(int screenWidth, int screenHeight)
    : screenWidth_(screenWidth), screenHeight_(screenHeight) {}

void GameEngine::Initialize() {
    ballSpawnPos_ = { (float)screenWidth_ * 0.5f, (float)screenHeight_ * 0.82f };
    ball_.Reset(ballSpawnPos_);

    // Goal at top center
    float goalWidth = 260.0f;
    float goalHeight = 70.0f;
    float goalX = (screenWidth_ - goalWidth) * 0.5f;
    float goalY = 55.0f;
    goal_.rect = { goalX, goalY, goalWidth, goalHeight };
    goal_.leftPost = { goalX, goalY + goalHeight };
    goal_.rightPost = { goalX + goalWidth, goalY + goalHeight };
    goal_.crossbarY = goalY + goalHeight;

    // Goalkeeper
    goalkeeper_.Reset({ (float)screenWidth_ * 0.5f, goalY + goalHeight - 12.0f }, goalWidth - 40.0f);

    // Defenders setup (obstacle wall)
    defenders_.clear();
    defenders_.emplace_back(Vector2{ (float)screenWidth_ * 0.38f, (float)screenHeight_ * 0.46f }, 75.0f, 1.4f, false);
    defenders_.emplace_back(Vector2{ (float)screenWidth_ * 0.62f, (float)screenHeight_ * 0.46f }, 75.0f, 1.4f, false);
    defenders_.emplace_back(Vector2{ (float)screenWidth_ * 0.50f, (float)screenHeight_ * 0.32f }, 50.0f, 1.8f, false);

    flowGauge_ = 0.0f;
    isFlowActive_ = false;
    currentSpin_ = 0.0f;
    state_ = GameState::Aiming;
}

void GameEngine::ResetShot() {
    ball_.Reset(ballSpawnPos_);
    currentSpin_ = 0.0f;
    shotPower_ = 0.0f;
    isDragging_ = false;
    state_ = GameState::Aiming;
    trajectoryPreview_.clear();
}

void GameEngine::ActivateFlowState() {
    if (flowGauge_ >= 100.0f && !isFlowActive_) {
        isFlowActive_ = true;
        flowDurationTimer_ = maxFlowDuration_;
        rinQuote_ = "«ЗНИЩЕННЯ. Я витягну твою найкращу рису і розтопчу її тут і зараз!»";
        particles_.EmitBurst(ballSpawnPos_, 80, colors::NeonCyan, 240.0f);
    }
}

void GameEngine::CalculateTrajectoryPreview() {
    trajectoryPreview_.clear();
    if (shotPower_ <= 20.0f) return;

    Vector2 simPos = ballSpawnPos_;
    Vector2 simVel = Vector2Scale(aimVector_, shotPower_);
    float simSpin = currentSpin_;
    float dt = 0.016f;

    float magnusFactor = isFlowActive_ ? 0.0042f : 0.0028f;

    for (int step = 0; step < 50; ++step) {
        trajectoryPreview_.push_back(simPos);

        float speed = Vector2Length(simVel);
        if (speed < 5.0f) break;

        Vector2 perp = { -simVel.y / speed, simVel.x / speed };
        float magnusMag = simSpin * speed * magnusFactor;
        Vector2 magnusAcc = Vector2Scale(perp, magnusMag);

        simVel = Vector2Add(simVel, Vector2Scale(magnusAcc, dt * 60.0f));
        simPos = Vector2Add(simPos, Vector2Scale(simVel, dt));

        // Stop preview if reaches goal height
        if (simPos.y < goal_.crossbarY - 10.0f) break;
    }
}

void GameEngine::ProcessInput() {
    Vector2 mousePos = GetMousePosition();

    // Adjust Spin using Q/E or A/D keys
    float spinSpeed = 160.0f * GetFrameTime();
    if (IsKeyDown(KEY_A) || IsKeyDown(KEY_Q)) {
        currentSpin_ = std::clamp(currentSpin_ - spinSpeed, -maxSpin_, maxSpin_);
    }
    if (IsKeyDown(KEY_D) || IsKeyDown(KEY_E)) {
        currentSpin_ = std::clamp(currentSpin_ + spinSpeed, -maxSpin_, maxSpin_);
    }

    // Activate Flow Mode with SPACE or F
    if (IsKeyPressed(KEY_F) || IsKeyPressed(KEY_SPACE)) {
        ActivateFlowState();
    }

    if (state_ == GameState::Aiming) {
        // Slingshot / vector aiming
        if (IsMouseButtonPressed(MOUSE_BUTTON_LEFT)) {
            float distToBall = Vector2Distance(mousePos, ballSpawnPos_);
            if (distToBall < 60.0f) {
                isDragging_ = true;
                dragStart_ = mousePos;
            }
        }

        if (isDragging_) {
            Vector2 dragVector = Vector2Subtract(ballSpawnPos_, mousePos);
            float dragDist = Vector2Length(dragVector);

            if (dragDist > 10.0f) {
                aimVector_ = Vector2Normalize(dragVector);
                // Ensure aim goes forward towards goal (negative Y)
                if (aimVector_.y > -0.2f) aimVector_.y = -0.2f;
                aimVector_ = Vector2Normalize(aimVector_);
                shotPower_ = std::clamp(dragDist * 4.5f, 50.0f, maxPower_);
            } else {
                shotPower_ = 0.0f;
            }

            CalculateTrajectoryPreview();

            if (IsMouseButtonReleased(MOUSE_BUTTON_LEFT)) {
                isDragging_ = false;
                if (shotPower_ > 100.0f) {
                    ball_.Launch(Vector2Scale(aimVector_, shotPower_), currentSpin_);
                    state_ = GameState::BallInFlight;
                    totalShots_++;
                    particles_.EmitBurst(ballSpawnPos_, 30, isFlowActive_ ? colors::NeonCyan : WHITE, 120.0f);
                }
            }
        }
    } else if (state_ == GameState::GoalScored || state_ == GameState::ShotBlocked) {
        shotResultTimer_ -= GetFrameTime();
        if (shotResultTimer_ <= 0.0f || IsKeyPressed(KEY_ENTER) || IsMouseButtonPressed(MOUSE_BUTTON_LEFT)) {
            ResetShot();
        }
    }
}

void GameEngine::Update(float dt) {
    // Flow state duration
    if (isFlowActive_) {
        flowDurationTimer_ -= dt;
        if (flowDurationTimer_ <= 0.0f) {
            isFlowActive_ = false;
            flowGauge_ = 0.0f;
            rinQuote_ = "«Стан Flow вичерпано. Перегрупування розрахунків.»";
        }
    }

    // Update defenders
    for (auto& df : defenders_) {
        df.Update(dt);
    }

    // Update particles
    particles_.Update(dt);

    if (state_ == GameState::BallInFlight) {
        ball_.Update(dt, isFlowActive_);
        Vector2 bPos = ball_.GetPosition();
        float bRad = ball_.GetRadius();

        // Emit motion sparks
        if (isFlowActive_ || fabsf(ball_.GetSpin()) > 150.0f) {
            particles_.Emit(bPos, { (float)GetRandomValue(-20, 20), (float)GetRandomValue(-20, 20) }, colors::NeonCyan, 4.0f, 3.5f);
        }

        // Update Goalkeeper AI
        goalkeeper_.Update(dt, bPos, ball_.GetVelocity(), true);

        // 1. Post Collisions
        if (CheckCollisionCircles(bPos, bRad, goal_.leftPost, goal_.postRadius)) {
            Vector2 normal = Vector2Normalize(Vector2Subtract(bPos, goal_.leftPost));
            ball_.Deflect(normal);
            particles_.EmitBurst(bPos, 20, colors::PostSilver, 150.0f);
        }
        if (CheckCollisionCircles(bPos, bRad, goal_.rightPost, goal_.postRadius)) {
            Vector2 normal = Vector2Normalize(Vector2Subtract(bPos, goal_.rightPost));
            ball_.Deflect(normal);
            particles_.EmitBurst(bPos, 20, colors::PostSilver, 150.0f);
        }

        // 2. Goalkeeper Save Check
        if (goalkeeper_.CheckSave(bPos, bRad)) {
            ball_.Stop();
            state_ = GameState::ShotBlocked;
            shotResultTimer_ = 2.2f;
            comboStreak_ = 0;
            rinQuote_ = "«Nurui. Твоя траєкторія була занадто очевидною для блокування.»";
            particles_.EmitBurst(bPos, 40, colors::Crimson, 200.0f);
            return;
        }

        // 3. Defender Block Check
        for (auto& df : defenders_) {
            if (df.CheckBlock(bPos, bRad)) {
                ball_.Stop();
                state_ = GameState::ShotBlocked;
                shotResultTimer_ = 2.2f;
                comboStreak_ = 0;
                rinQuote_ = "«Захисна лінія прочитала твій імпульс. Прораховуй кривизну заздалегідь.»";
                particles_.EmitBurst(bPos, 35, colors::DefenderGlow, 180.0f);
                return;
            }
        }

        // 4. Goal Check (Ball crosses crossbar inside posts)
        if (bPos.y < goal_.crossbarY && bPos.y > goal_.rect.y &&
            bPos.x > goal_.leftPost.x + goal_.postRadius &&
            bPos.x < goal_.rightPost.x - goal_.postRadius) {
            
            ball_.Stop();
            state_ = GameState::GoalScored;
            shotResultTimer_ = 2.5f;
            goalsScored_++;
            comboStreak_++;
            bestStreak_ = std::max(bestStreak_, comboStreak_);

            // Award Flow Gauge based on spin mastery
            float spinBonus = fabsf(ball_.GetSpin()) / maxSpin_ * 25.0f;
            flowGauge_ = std::min(100.0f, flowGauge_ + 25.0f + spinBonus);

            rinQuote_ = "«ГОЛ. Траєкторія розрахунку зійшлася з точністю до міліметра.»";
            particles_.EmitBurst(bPos, 90, colors::NeonCyan, 300.0f);
            return;
        }

        // 5. Out of bounds check
        if (bPos.x < 0 || bPos.x > screenWidth_ || bPos.y < 0 || bPos.y > screenHeight_) {
            ball_.Stop();
            state_ = GameState::ShotBlocked;
            shotResultTimer_ = 2.0f;
            comboStreak_ = 0;
            rinQuote_ = "«М'яч поза полем. Забагато сили, замало математичного контролю.»";
        }
    } else {
        goalkeeper_.Update(dt, ball_.GetPosition(), { 0, 0 }, false);
    }
}

void GameEngine::Render() const {
    BeginDrawing();
    ClearBackground(colors::Background);

    // Background Tactical Grid
    const int gridSize = 40;
    Color gridCol = { 15, 35, 45, 120 };
    for (int x = 0; x < screenWidth_; x += gridSize) {
        DrawLine(x, 0, x, screenHeight_, gridCol);
    }
    for (int y = 0; y < screenHeight_; y += gridSize) {
        DrawLine(0, y, screenWidth_, y, gridCol);
    }

    // Goal & Pitch Markings
    goal_.Draw();

    // Penalty Area Box lines
    DrawRectangleLinesEx({ (float)screenWidth_ * 0.18f, goal_.crossbarY, (float)screenWidth_ * 0.64f, 220.0f }, 1.5f, { 0, 255, 200, 45 });
    DrawCircleLines(screenWidth_ / 2, (int)(goal_.crossbarY + 220.0f), 65.0f, { 0, 255, 200, 35 });

    // Goalkeeper & Defenders
    goalkeeper_.Draw();
    for (const auto& df : defenders_) {
        df.Draw();
    }

    // Trajectory Preview Dots
    if (state_ == GameState::Aiming && isDragging_) {
        for (size_t i = 0; i < trajectoryPreview_.size(); ++i) {
            float alpha = 1.0f - (float)i / trajectoryPreview_.size();
            Color dotCol = isFlowActive_ ? colors::NeonCyan : colors::DeepCyan;
            dotCol.a = (unsigned char)(alpha * 190.0f);
            DrawCircleV(trajectoryPreview_[i], 3.0f, dotCol);
        }

        // Slingshot Pull Vector line
        DrawLineEx(ballSpawnPos_, GetMousePosition(), 2.0f, colors::NeonCyan);
    }

    // Particles & Ball
    particles_.Draw();
    ball_.Draw(isFlowActive_);

    // -------------------------------------------------------------
    // HUD & RIN DATA ARCHIVE
    // -------------------------------------------------------------
    // Top Bar HUD
    DrawRectangle(0, 0, screenWidth_, 45, { 10, 16, 26, 230 });
    DrawLine(0, 45, screenWidth_, 45, colors::DeepCyan);

    DrawText("BLUE LOCK // ITOSHI RIN PROTOCOL", 20, 14, 18, colors::NeonCyan);

    std::string scoreStr = "GOALS: " + std::to_string(goalsScored_) + " / " + std::to_string(totalShots_);
    DrawText(scoreStr.c_str(), screenWidth_ - 260, 14, 18, WHITE);

    std::string streakStr = "STREAK: " + std::to_string(comboStreak_);
    DrawText(streakStr.c_str(), screenWidth_ - 110, 14, 18, colors::NeonCyan);

    // Left HUD Panel: Spin / Curve Gauge
    int hudY = 70;
    DrawRectangle(15, hudY, 190, 130, { 12, 22, 35, 220 });
    DrawRectangleLinesEx({ 15, (float)hudY, 190, 130 }, 1.0f, colors::DeepCyan);

    DrawText("CURVE CONTROL [A/D]", 25, hudY + 10, 13, colors::NeonCyan);
    float spinPercent = currentSpin_ / maxSpin_;
    
    // Spin direction bar
    DrawRectangle(25, hudY + 35, 170, 14, { 5, 10, 18, 255 });
    int barCenter = 25 + 85;
    int barFill = (int)(spinPercent * 85.0f);
    if (barFill >= 0) {
        DrawRectangle(barCenter, hudY + 35, barFill, 14, colors::NeonCyan);
    } else {
        DrawRectangle(barCenter + barFill, hudY + 35, -barFill, 14, colors::NeonCyan);
    }
    DrawLine(barCenter, hudY + 32, barCenter, hudY + 52, WHITE);

    std::string spinValText = (currentSpin_ >= 0 ? "+" : "") + std::to_string((int)currentSpin_) + " RPM";
    DrawText(spinValText.c_str(), 25, hudY + 58, 14, WHITE);
    DrawText("Q / A: КРУТИТИ ВЛІВО\nE / D: КРУТИТИ ВПРАВО", 25, hudY + 80, 11, { 160, 185, 210, 255 });

    // Right HUD Panel: FLOW GAUGE
    int flowHudX = screenWidth_ - 205;
    DrawRectangle(flowHudX, hudY, 190, 130, { 12, 22, 35, 220 });
    DrawRectangleLinesEx({ (float)flowHudX, (float)hudY, 190, 130 }, 1.0f, isFlowActive_ ? colors::Crimson : colors::DeepCyan);

    DrawText("FLOW GAUGE [SPACE / F]", flowHudX + 12, hudY + 10, 12, isFlowActive_ ? colors::Crimson : colors::NeonCyan);

    // Flow progress bar
    DrawRectangle(flowHudX + 12, hudY + 35, 166, 16, { 5, 10, 18, 255 });
    float flowFillWidth = (flowGauge_ / 100.0f) * 166.0f;
    Color flowBarCol = isFlowActive_ ? colors::Crimson : colors::NeonCyan;
    DrawRectangle(flowHudX + 12, hudY + 35, (int)flowFillWidth, 16, flowBarCol);

    if (isFlowActive_) {
        std::string flowTimerStr = "FLOW ACTIVE: " + std::to_string((int)std::ceil(flowDurationTimer_)) + "s";
        DrawText(flowTimerStr.c_str(), flowHudX + 12, hudY + 60, 13, colors::Crimson);
        DrawText("УДАР ЗНИЩЕННЯ\nПІДСИЛЕННЯ × 2.5", flowHudX + 12, hudY + 82, 11, colors::NeonCyan);
    } else {
        std::string flowStatus = (flowGauge_ >= 100.0f) ? "READY! PRESS SPACE" : std::to_string((int)flowGauge_) + "% CHARGED";
        DrawText(flowStatus.c_str(), flowHudX + 12, hudY + 60, 12, (flowGauge_ >= 100.0f) ? colors::NeonCyan : WHITE);
        DrawText("Забивай голи з підкруткою\nдля активації Flow", flowHudX + 12, hudY + 82, 11, { 160, 185, 210, 255 });
    }

    // Bottom Rin Dialogue Box
    DrawRectangle(20, screenHeight_ - 55, screenWidth_ - 40, 42, { 8, 14, 22, 240 });
    DrawRectangleLinesEx({ 20, (float)(screenHeight_ - 55), (float)(screenWidth_ - 40), 42 }, 1.0f, colors::DeepCyan);
    DrawText("RIN ITOSHI:", 32, screenHeight_ - 45, 13, colors::NeonCyan);
    DrawText(rinQuote_.c_str(), 145, screenHeight_ - 45, 13, WHITE);

    // Goal or Block Overlay Splash
    if (state_ == GameState::GoalScored) {
        DrawRectangle(0, screenHeight_ / 2 - 50, screenWidth_, 100, { 0, 255, 200, 40 });
        DrawText("GOAL! ABSOLUTE DESTRUCTION", screenWidth_ / 2 - 250, screenHeight_ / 2 - 25, 32, colors::NeonCyan);
    } else if (state_ == GameState::ShotBlocked) {
        DrawRectangle(0, screenHeight_ / 2 - 50, screenWidth_, 100, { 255, 42, 95, 40 });
        DrawText("BLOCKED! NURUI...", screenWidth_ / 2 - 160, screenHeight_ / 2 - 25, 32, colors::Crimson);
    }

    EndDrawing();
}

bool GameEngine::ShouldClose() const {
    return WindowShouldClose();
}

} // namespace rin_game
