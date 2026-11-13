# Makefile for ITOSHI RIN // RAYLIB C++ 2D GAME

CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -O2
INCLUDES = -I.
LIBS = -lraylib -lopengl32 -lgdi32 -lwinmm

TARGET = ItoshiRinGame.exe
SRCS = main.cpp game.cpp

all: $(TARGET)

$(TARGET): $(SRCS)
	$(CXX) $(CXXFLAGS) $(INCLUDES) $(SRCS) -o $(TARGET) $(LIBS)

clean:
	rm -f $(TARGET) *.o
