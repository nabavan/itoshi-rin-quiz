cmake_minimum_required(VERSION 3.16)
project(ItoshiRinGame LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find Raylib
find_package(raylib 4.5 QUIET)
if (NOT raylib_FOUND)
    include(FetchContent)
    FetchContent_Declare(
        raylib
        URL https://github.com/raysan5/raylib/archive/refs/tags/5.0.tar.gz
    )
    FetchContent_MakeAvailable(raylib)
endif()

add_executable(ItoshiRinGame
    main.cpp
    game.cpp
    game.h
)

target_link_libraries(ItoshiRinGame PRIVATE raylib)

if (WIN32)
    target_link_libraries(ItoshiRinGame PRIVATE winmm gdi32 opengl32)
endif()
