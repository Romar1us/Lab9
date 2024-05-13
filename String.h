#ifndef CSTRING_H
#define CSTRING_H

#include <iostream>

class CString
{
private:
    char* m_str;

public:
    CString();
    explicit CString(const char* s);
    CString(const CString& other);
    CString(CString&& other) noexcept;

    ~CString();

    char* getString() const;

    unsigned getNumberOfChar(const char ch) const;
    int findSubstring(const char* substr) const;
    void removeChar(const char ch) const;
    void sotrStringInAlphabet() const;
    void sotrStringAntiAlphabet() const;
    void insertString(const CString& str, unsigned pos);

    CString& operator=(const CString& other);
    CString& operator=(CString&& other) noexcept;
    CString operator+(const CString& other) const;
    CString operator-(const CString& other) const;
    char& operator[] (unsigned index);


    friend std::ostream& operator<<(std::ostream& out, const CString& PrintedOut);
    friend std::istream& operator>>(std::istream& in, CString& CStringIn);
};

#endif