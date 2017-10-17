#pragma once

enum State {
	begin = 1,
	starting = 2,
	run = 4
};

class EdtStatemachine {
public:
	EdtStatemachine() : _state(State::begin) {};

	State current() {
		return _state;
	}

	void begin() {
		_state = State::begin;
	}

	void step() {
		State newState;

		switch (_state) {
		case State::begin:
			newState = State::starting;
			break;
		case State::starting:
			newState = State::run;
			break;
		default:
			newState = State::begin;
			break;
		}

		_state = newState;
	};
private:
	State _state;
};