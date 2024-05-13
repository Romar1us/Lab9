#ifndef CSTRING_H
#define CSTRING_H

#include <iostream>

class CString
{
private:
    char* m_str;

public:
    CString() noexcept;
    explicit CString(const char* s);
    CString(const CString& other);
    CString(CString&& other) noexcept;

    ~CString() noexcept;

    char* getString() const noexcept;

    unsigned getNumberOfChar(const char ch) const noexcept;
    int findSubstring(const char* substr) const;
    void removeChar(const char ch) const;
    void sotrStringInAlphabet() const noexcept;
    void sotrStringAntiAlphabet() const noexcept;
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