#include "String.h"

CString::CString() : m_str(nullptr) {};

CString::CString(const char* s)
{
    m_str = new char[strlen(s) + 1];
    strcpy(m_str, s);
}

CString::CString(const CString& other) : m_str(nullptr)
{
    if (other.m_str != nullptr)
    {
        m_str = new char[strlen(other.m_str) + 1];
        strcpy(m_str, other.m_str);
    }
}

CString& CString::operator=(const CString& other)
{
    if (this != &other)
    {
        delete[] m_str;

        if (!other.m_str)
            m_str = nullptr;
        else
        {
            m_str = new char[strlen(other.m_str) + 1];
            strcpy(m_str, other.m_str);
        }
    }

    return *this;
}

CString::CString(CString&& other) noexcept
{
    m_str = other.m_str;
    other.m_str = nullptr;
}

CString& CString::operator=(CString&& other) noexcept
{
    if (this != &other)
    {
        delete[] m_str;
        m_str = other.m_str;
        other.m_str = nullptr;
    }

    return *this;
}

CString::~CString()
{
    delete[] m_str;
}

char* CString::getString() const
{
    return m_str;
}

void CString::removeChar(const char ch) const
{
    if (!m_str)
        return;

    unsigned curIndex = 0U;
    unsigned updIndex = 0U;

    while (m_str[curIndex] != '\0')
    {
        if (m_str[curIndex] != ch)
        {
            m_str[updIndex] = m_str[curIndex];
            updIndex++;
        }
        curIndex++;
    }

    m_str[updIndex] = '\0';
}

unsigned CString::getNumberOfChar(const char ch) const
{
    if (!m_str)
        return 0;

    unsigned counter = 0U;
    unsigned curIndex = 0U;

    while (m_str[curIndex] != '\0')
    {
        if (m_str[curIndex] == ch)
            counter++;

        curIndex++;
    }

    return counter;
}

int compareChars(const void* a, const void* b)
{
    return (*(char*)a - *(char*)b);
}

int reversCompareChars(const void* a, const void* b)
{
    return (*(char*)b - *(char*)a);
}

void CString::sotrStringInAlphabet() const
{
    if (!m_str)
        return;

    qsort(m_str, strlen(m_str), sizeof(char), compareChars);
}

void CString::sotrStringAntiAlphabet() const
{
    if (!m_str)
        return;

    qsort(m_str, strlen(m_str), sizeof(char), reversCompareChars);
}

void CString::insertString(const CString& str, unsigned pos)
{
    if (!m_str)
        return;

    if (!str.m_str)
        return;

    size_t len1 = strlen(m_str);
    size_t len2 = strlen(str.m_str);
    size_t newLen = len1 + len2;

    char* newStr = new char[newLen + 1];

    strncpy(newStr, m_str, pos);
    newStr[pos] = '\0';

    strcat(newStr, str.m_str);
    strcat(newStr, m_str + pos);

    delete[] m_str;

    m_str = newStr;
}

int CString::findSubstring(const char* substr) const
{
    if (!m_str || !substr)
        return -1;

    size_t len1 = strlen(m_str);
    size_t len2 = strlen(substr);

    if (len2 > len1)
        return -1;

    int* prefix = new int[len2];
    prefix[0] = 0;
    int j = 0;
    for (size_t i = 1; i < len2; ++i)
    {
        while (j > 0 && substr[i] != substr[j])
            j = prefix[j - 1];
        if (substr[i] == substr[j])
            ++j;
        prefix[i] = j;
    }

    j = 0;
    for (size_t i = 0; i < len1; ++i)
    {
        while (j > 0 && m_str[i] != substr[j])
            j = prefix[j - 1];
        if (m_str[i] == substr[j])
        {
            ++j;
            if (j == len2)
            {
                delete[] prefix;
                return static_cast<int>(i - len2 + 1);
            }
        }
    }

    delete[] prefix;
    return -1;
}

CString CString::operator+(const CString& other) const
{
    if (!other.m_str)
        return *this;

    CString result;

    size_t len1 = strlen(m_str);
    size_t len2 = strlen(other.m_str);
    size_t newLen = len1 + len2;

    result.m_str = new char[newLen + 1];

    strcpy(result.m_str, m_str);
    strcat(result.m_str, other.m_str);

    return result;
}

CString CString::operator-(const CString& other) const
{
    if (!m_str || !other.m_str)
        return *this;

    const char* substrPosition = strstr(m_str, other.m_str);
    if (!substrPosition)
        return *this;

    size_t startPos = substrPosition - m_str;
    size_t lenToRemove = strlen(other.m_str);

    char* newStr = new char[strlen(m_str) - lenToRemove + 1];
    strncpy(newStr, m_str, startPos);
    strcpy(newStr + startPos, substrPosition + lenToRemove);

    CString result(newStr);
    delete[] newStr;

    return result;
}

char& CString::operator[](unsigned index)
{
    if (m_str && index < strlen(m_str))
        return m_str[index];
    else
        throw std::out_of_range("Index out of range");
}

std::ostream& operator<<(std::ostream& out, const CString& PrintedOut)
{
    return out << PrintedOut.m_str;
}

std::istream& operator>>(std::istream& in, CString& CStringIn)
{
    char buff[1024];
    in.getline(buff, 1024);
    CStringIn = CString(buff);
    return in;
}