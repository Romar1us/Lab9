#include <iostream>
#include <sstream>
#include <string>
#include <msclr/marshal_cppstd.h>
#include "Exception.h"
#include "MyForm.h"

using namespace msclr::interop;


System::Void Lab9::MyForm::OnChangeCheck(System::Object^ sender, System::EventArgs^ e)
{
	if (firstArray_rb->Checked)
	{
		SelectedIndex = 0;
	}
	else
	{
		SelectedIndex = 1;
	}
}

System::Void Lab9::MyForm::MyForm_Load(System::Object^ sender, System::EventArgs^ e)
{
	firstArray_rb->Select();
	SelectedIndex = 0;
	Strings = new CString[3];
}

System::Void Lab9::MyForm::deleteFrom_Button_Click(System::Object^ sender, System::EventArgs^ e)
{
	std::string a = marshal_as<std::string>(deleteVal_TextBox->Text);

	Strings[SelectedIndex].removeChar(a[0]);
	std::stringstream ss;
	ss << Strings[SelectedIndex];
	if (SelectedIndex == 0)
	{
		firstString_TextBox->Text = gcnew String(ss.str().c_str());
	}
	else
	{
		secondString_TextBox->Text = gcnew String(ss.str().c_str());
	}
}

System::Void Lab9::MyForm::confirm_Button_Click(System::Object^ sender, System::EventArgs^ e)
{
	std::string value1 = marshal_as<std::string>(firstString_TextBox->Text);
	std::string value2 = marshal_as<std::string>(secondString_TextBox->Text);


	Strings[0] = CString(value1.c_str());
	Strings[1] = CString(value2.c_str());
	return System::Void();
}

System::Void Lab9::MyForm::countEntries_Button_Click(System::Object^ sender, System::EventArgs^ e)
{

	std::string a = marshal_as<std::string>(entry_TextBox->Text);
	int entries = Strings[SelectedIndex].getNumberOfChar(a.c_str()[0]);
	MessageBox::Show(Convert::ToString(entries));
}

System::Void Lab9::MyForm::sortAscending_Button_Click(System::Object^ sender, System::EventArgs^ e)
{
	Strings[SelectedIndex].sotrStringInAlphabet();
	std::stringstream ss;
	ss << Strings[SelectedIndex];

	if (SelectedIndex == 0)
	{
		firstString_TextBox->Text = gcnew String(ss.str().c_str());
	}
	else
	{
		secondString_TextBox->Text = gcnew String(ss.str().c_str());
	}
}

System::Void Lab9::MyForm::sortDescending_Button_Click(System::Object^ sender, System::EventArgs^ e)
{
	Strings[SelectedIndex].sotrStringAntiAlphabet();
	std::stringstream ss;
	ss << Strings[SelectedIndex];

	if (SelectedIndex == 0)
	{
		firstString_TextBox->Text = gcnew String(ss.str().c_str());
	}
	else
	{
		secondString_TextBox->Text = gcnew String(ss.str().c_str());
	}
}

System::Void Lab9::MyForm::insert_Button_Click(System::Object^ sender, System::EventArgs^ e)
{
	std::stringstream ss;
	int position = Convert::ToInt32(position_TextBox->Text);
	std::string s = marshal_as<std::string>(toInsert_TextBox->Text);

	Strings[SelectedIndex].insertString(CString(s.c_str()), position);
	ss << Strings[SelectedIndex];
	if (SelectedIndex == 0)
	{
		firstString_TextBox->Text = gcnew String(ss.str().c_str());
	}
	else
	{
		secondString_TextBox->Text = gcnew String(ss.str().c_str());
	}
}

System::Void Lab9::MyForm::subString_Button_Click(System::Object^ sender, System::EventArgs^ e)
{
	std::string subString = marshal_as<std::string>(subString_TextBox->Text);
	int index = Strings[SelectedIndex].findSubstring(subString.c_str());
	MessageBox::Show(Convert::ToString(index));
}

System::Void Lab9::MyForm::addString_btn_Click(System::Object^ sender, System::EventArgs^ e)
{
	std::stringstream ss;

	try
	{
		Strings[2] = std::move(Strings[0] + Strings[1]);
	}
	catch (...)
	{

	}
	ss << Strings[2];
	resultLabel->Text = gcnew String(ss.str().c_str());
}

System::Void Lab9::MyForm::substractStrings_btn_Click(System::Object^ sender, System::EventArgs^ e)
{
	std::stringstream ss;

	Strings[2] = std::move(Strings[0] - Strings[1]);
	ss << Strings[2];
	resultLabel->Text = gcnew String(ss.str().c_str());
}
