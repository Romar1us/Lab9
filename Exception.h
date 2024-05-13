#ifndef EXCEPTIONS_H
#define EXCEPTIONS_H
#include "fstream"
#include <exception>

class Exception
{
public:
	Exception() : message("Exception") {};
	Exception(const char* msg) : message(msg) {
		time_t curtime;
		struct tm* timeinfo;
		time(&curtime); 
		timeinfo = localtime(&curtime); 
		std::ofstream logFile;
		logFile.open("Log.txt", std::ios::out | std::ios::app);
		if (logFile.is_open())
		{
			logFile << "[" << timeinfo->tm_hour << ":" << timeinfo->tm_min << " "
				<< timeinfo->tm_mday << "/" << timeinfo->tm_mon << "/" << timeinfo->tm_year << "]\t"
				<< "Error occurred: " << message << "\n";
		}
		logFile.close();
	};
	const char* GetMessage() const {
		return message;
	}
private:
	const char* message;
};

class MemoryAllocError : public Exception
{
public:
	MemoryAllocError() : Exception("Exception: lack of dynamic memory.\n") {}
};

class IOError : public Exception {
public:
	IOError() : Exception("Exception: error working with istream/ostream.\n") {}
};

class OutOfRangeDelete : public Exception {
public:
	OutOfRangeDelete() : Exception("Exception: try to delete out of range\n") {}
};

class OutOfRangeInsert : public Exception {
public:
	OutOfRangeInsert() : Exception("Exception: try to insert out of range\n") {}
};

class OutOfRangeException : public Exception {
public:
	OutOfRangeException() : Exception("Exception: out of range.\n") {}
};

#endif