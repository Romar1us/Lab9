#pragma once
#include <iostream>
#include "String.h"


namespace Lab9 {

	using namespace System;
	using namespace System::ComponentModel;
	using namespace System::Collections;
	using namespace System::Windows::Forms;
	using namespace System::Data;
	using namespace System::Drawing;

	/// <summary>
	/// Summary for MyForm
	/// </summary>
	public ref class MyForm : public System::Windows::Forms::Form
	{
	public:
		MyForm(void)
		{
			InitializeComponent();
			//
			//TODO: Add the constructor code here
			//
		}

	protected:
		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		~MyForm()
		{
			if (components)
			{
				delete components;
			}
		}
	private: System::Windows::Forms::Label^ label1;

	private: System::Windows::Forms::TextBox^ deleteVal_TextBox;
	protected:





	private: System::Windows::Forms::Button^ deleteFrom_Button;
	private: System::Windows::Forms::Button^ sortAscending_Button;
	private: System::Windows::Forms::Button^ sortDescending_Button;
	private: System::Windows::Forms::Button^ insert_Button;
	private: System::Windows::Forms::Button^ subString_Button;





	private: System::Windows::Forms::RadioButton^ firstArray_rb;

	private: System::Windows::Forms::RadioButton^ secondArray_rb;



	private: System::Windows::Forms::Label^ label3;

	private: System::Windows::Forms::TextBox^ entry_TextBox;

	private: System::Windows::Forms::Label^ resultLabel;
	private: System::Windows::Forms::Label^ label4;
	private: System::Windows::Forms::Button^ addString_btn;
	private: System::Windows::Forms::Button^ substractStrings_btn;


	private: System::Windows::Forms::Button^ countEntries_Button;
	private: System::Windows::Forms::TextBox^ toInsert_TextBox;
	private: System::Windows::Forms::TextBox^ subString_TextBox;
	private: System::Windows::Forms::TextBox^ firstString_TextBox;
	private: System::Windows::Forms::TextBox^ secondString_TextBox;


	private: System::Windows::Forms::Button^ confirm_Button;
	private: System::Windows::Forms::Label^ label2;
	private: System::Windows::Forms::TextBox^ position_TextBox;







	protected:

	private:
		/// <summary>
		/// Required designer variable.
		/// </summary>
		System::ComponentModel::Container^ components;

#pragma region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		void InitializeComponent(void)
		{
			this->addString_btn = (gcnew System::Windows::Forms::Button());
			this->substractStrings_btn = (gcnew System::Windows::Forms::Button());
			this->label1 = (gcnew System::Windows::Forms::Label());
			this->deleteVal_TextBox = (gcnew System::Windows::Forms::TextBox());
			this->deleteFrom_Button = (gcnew System::Windows::Forms::Button());
			this->sortAscending_Button = (gcnew System::Windows::Forms::Button());
			this->sortDescending_Button = (gcnew System::Windows::Forms::Button());
			this->insert_Button = (gcnew System::Windows::Forms::Button());
			this->subString_Button = (gcnew System::Windows::Forms::Button());
			this->firstArray_rb = (gcnew System::Windows::Forms::RadioButton());
			this->secondArray_rb = (gcnew System::Windows::Forms::RadioButton());
			this->label3 = (gcnew System::Windows::Forms::Label());
			this->countEntries_Button = (gcnew System::Windows::Forms::Button());
			this->entry_TextBox = (gcnew System::Windows::Forms::TextBox());
			this->resultLabel = (gcnew System::Windows::Forms::Label());
			this->label4 = (gcnew System::Windows::Forms::Label());
			this->toInsert_TextBox = (gcnew System::Windows::Forms::TextBox());
			this->subString_TextBox = (gcnew System::Windows::Forms::TextBox());
			this->firstString_TextBox = (gcnew System::Windows::Forms::TextBox());
			this->secondString_TextBox = (gcnew System::Windows::Forms::TextBox());
			this->confirm_Button = (gcnew System::Windows::Forms::Button());
			this->label2 = (gcnew System::Windows::Forms::Label());
			this->position_TextBox = (gcnew System::Windows::Forms::TextBox());
			this->SuspendLayout();
			// 
			// addString_btn
			// 
			this->addString_btn->AutoSize = true;
			this->addString_btn->Font = (gcnew System::Drawing::Font(L"Microsoft Sans Serif", 10.2F, System::Drawing::FontStyle::Regular, System::Drawing::GraphicsUnit::Point,
				static_cast<System::Byte>(0)));
			this->addString_btn->Location = System::Drawing::Point(453, 218);
			this->addString_btn->Name = L"addString_btn";
			this->addString_btn->Size = System::Drawing::Size(111, 30);
			this->addString_btn->TabIndex = 14;
			this->addString_btn->Text = L"Add strings";
			this->addString_btn->UseVisualStyleBackColor = true;
			this->addString_btn->Click += gcnew System::EventHandler(this, &MyForm::addString_btn_Click);
			// 
			// substractStrings_btn
			// 
			this->substractStrings_btn->AutoSize = true;
			this->substractStrings_btn->Font = (gcnew System::Drawing::Font(L"Microsoft Sans Serif", 10.2F, System::Drawing::FontStyle::Regular,
				System::Drawing::GraphicsUnit::Point, static_cast<System::Byte>(0)));
			this->substractStrings_btn->Location = System::Drawing::Point(453, 254);
			this->substractStrings_btn->Name = L"substractStrings_btn";
			this->substractStrings_btn->Size = System::Drawing::Size(154, 30);
			this->substractStrings_btn->TabIndex = 15;
			this->substractStrings_btn->Text = L"Subtract strings";
			this->substractStrings_btn->UseVisualStyleBackColor = true;
			this->substractStrings_btn->Click += gcnew System::EventHandler(this, &MyForm::substractStrings_btn_Click);
			// 
			// label1
			// 
			this->label1->AutoSize = true;
			this->label1->Font = (gcnew System::Drawing::Font(L"Microsoft Sans Serif", 13.8F, System::Drawing::FontStyle::Regular, System::Drawing::GraphicsUnit::Point,
				static_cast<System::Byte>(0)));
			this->label1->Location = System::Drawing::Point(43, 28);
			this->label1->Name = L"label1";
			this->label1->Size = System::Drawing::Size(108, 29);
			this->label1->TabIndex = 0;
			this->label1->Text = L"String #1";
			// 
			// deleteVal_TextBox
			// 
			this->deleteVal_TextBox->Location = System::Drawing::Point(629, 28);
			this->deleteVal_TextBox->Name = L"deleteVal_TextBox";
			this->deleteVal_TextBox->Size = System::Drawing::Size(100, 22);
			this->deleteVal_TextBox->TabIndex = 2;
			// 
			// deleteFrom_Button
			// 
			this->deleteFrom_Button->AutoSize = true;
			this->deleteFrom_Button->Font = (gcnew System::Drawing::Font(L"Microsoft Sans Serif", 10.2F, System::Drawing::FontStyle::Regular,
				System::Drawing::GraphicsUnit::Point, static_cast<System::Byte>(0)));
			this->deleteFrom_Button->Location = System::Drawing::Point(453, 20);
			this->deleteFrom_Button->Name = L"deleteFrom_Button";
			this->deleteFrom_Button->Size = System::Drawing::Size(154, 34);
			this->deleteFrom_Button->TabIndex = 5;
			this->deleteFrom_Button->Text = L"Delete from string";
			this->deleteFrom_Button->UseVisualStyleBackColor = true;
			this->deleteFrom_Button->Click += gcnew System::EventHandler(this, &MyForm::deleteFrom_Button_Click);
			// 
			// sortAscending_Button
			// 
			this->sortAscending_Button->AutoSize = true;
			this->sortAscending_Button->Font = (gcnew System::Drawing::Font(L"Microsoft Sans Serif", 10.2F, System::Drawing::FontStyle::Regular,
				System::Drawing::GraphicsUnit::Point, static_cast<System::Byte>(0)));
			this->sortAscending_Button->Location = System::Drawing::Point(453, 106);
			this->sortAscending_Button->Name = L"sortAscending_Button";
			this->sortAscending_Button->Size = System::Drawing::Size(133, 34);
			this->sortAscending_Button->TabIndex = 6;
			this->sortAscending_Button->Text = L"Sort Ascending";
			this->sortAscending_Button->UseVisualStyleBackColor = true;
			this->sortAscending_Button->Click += gcnew System::EventHandler(this, &MyForm::sortAscending_Button_Click);
			// 
			// sortDescending_Button
			// 
			this->sortDescending_Button->AutoSize = true;
			this->sortDescending_Button->AutoSizeMode = System::Windows::Forms::AutoSizeMode::GrowAndShrink;
			this->sortDescending_Button->Font = (gcnew System::Drawing::Font(L"Microsoft Sans Serif", 10.2F, System::Drawing::FontStyle::Regular,
				System::Drawing::GraphicsUnit::Point, static_cast<System::Byte>(0)));
			this->sortDescending_Button->Location = System::Drawing::Point(629, 110);
			this->sortDescending_Button->Name = L"sortDescending_Button";
			this->sortDescending_Button->Size = System::Drawing::Size(144, 30);
			this->sortDescending_Button->TabIndex = 7;
			this->sortDescending_Button->Text = L"Sort Descending";
			this->sortDescending_Button->UseVisualStyleBackColor = true;
			this->sortDescending_Button->Click += gcnew System::EventHandler(this, &MyForm::sortDescending_Button_Click);
			// 
			// insert_Button
			// 
			this->insert_Button->AutoSize = true;
			this->insert_Button->AutoSizeMode = System::Windows::Forms::AutoSizeMode::GrowAndShrink;
			this->insert_Button->Font = (gcnew System::Drawing::Font(L"Microsoft Sans Serif", 10.2F, System::Drawing::FontStyle::Regular, System::Drawing::GraphicsUnit::Point,
				static_cast<System::Byte>(0)));
			this->insert_Button->Location = System::Drawing::Point(453, 146);
			this->insert_Button->Name = L"insert_Button";
			this->insert_Button->Size = System::Drawing::Size(61, 30);
			this->insert_Button->TabIndex = 8;
			this->insert_Button->Text = L"Insert";
			this->insert_Button->UseVisualStyleBackColor = true;
			this->insert_Button->Click += gcnew System::EventHandler(this, &MyForm::insert_Button_Click);
			// 
			// subString_Button
			// 
			this->subString_Button->AutoSize = true;
			this->subString_Button->Font = (gcnew System::Drawing::Font(L"Microsoft Sans Serif", 10.2F, System::Drawing::FontStyle::Regular,
				System::Drawing::GraphicsUnit::Point, static_cast<System::Byte>(0)));
			this->subString_Button->Location = System::Drawing::Point(453, 182);
			this->subString_Button->Name = L"subString_Button";
			this->subString_Button->Size = System::Drawing::Size(130, 30);
			this->subString_Button->TabIndex = 9;
			this->subString_Button->Text = L"Find sub string";
			this->subString_Button->UseVisualStyleBackColor = true;
			this->subString_Button->Click += gcnew System::EventHandler(this, &MyForm::subString_Button_Click);
			// 
			// firstArray_rb
			// 
			this->firstArray_rb->AutoSize = true;
			this->firstArray_rb->Location = System::Drawing::Point(12, 38);
			this->firstArray_rb->Name = L"firstArray_rb";
			this->firstArray_rb->Size = System::Drawing::Size(17, 16);
			this->firstArray_rb->TabIndex = 10;
			this->firstArray_rb->TabStop = true;
			this->firstArray_rb->UseVisualStyleBackColor = true;
			this->firstArray_rb->CheckedChanged += gcnew System::EventHandler(this, &MyForm::OnChangeCheck);
			// 
			// secondArray_rb
			// 
			this->secondArray_rb->AutoSize = true;
			this->secondArray_rb->Location = System::Drawing::Point(12, 94);
			this->secondArray_rb->Name = L"secondArray_rb";
			this->secondArray_rb->Size = System::Drawing::Size(17, 16);
			this->secondArray_rb->TabIndex = 13;
			this->secondArray_rb->TabStop = true;
			this->secondArray_rb->UseVisualStyleBackColor = true;
			this->secondArray_rb->CheckedChanged += gcnew System::EventHandler(this, &MyForm::OnChangeCheck);
			// 
			// label3
			// 
			this->label3->AutoSize = true;
			this->label3->Font = (gcnew System::Drawing::Font(L"Microsoft Sans Serif", 13.8F, System::Drawing::FontStyle::Regular, System::Drawing::GraphicsUnit::Point,
				static_cast<System::Byte>(0)));
			this->label3->Location = System::Drawing::Point(43, 84);
			this->label3->Name = L"label3";
			this->label3->Size = System::Drawing::Size(108, 29);
			this->label3->TabIndex = 11;
			this->label3->Text = L"String #2";
			// 
			// countEntries_Button
			// 
			this->countEntries_Button->AutoSize = true;
			this->countEntries_Button->Font = (gcnew System::Drawing::Font(L"Microsoft Sans Serif", 10.2F, System::Drawing::FontStyle::Regular,
				System::Drawing::GraphicsUnit::Point, static_cast<System::Byte>(0)));
			this->countEntries_Button->Location = System::Drawing::Point(453, 60);
			this->countEntries_Button->Name = L"countEntries_Button";
			this->countEntries_Button->Size = System::Drawing::Size(119, 30);
			this->countEntries_Button->TabIndex = 16;
			this->countEntries_Button->Text = L"Count entries";
			this->countEntries_Button->UseVisualStyleBackColor = true;
			this->countEntries_Button->Click += gcnew System::EventHandler(this, &MyForm::countEntries_Button_Click);
			// 
			// entry_TextBox
			// 
			this->entry_TextBox->Location = System::Drawing::Point(629, 68);
			this->entry_TextBox->Name = L"entry_TextBox";
			this->entry_TextBox->Size = System::Drawing::Size(100, 22);
			this->entry_TextBox->TabIndex = 17;
			// 
			// resultLabel
			// 
			this->resultLabel->BackColor = System::Drawing::SystemColors::ActiveBorder;
			this->resultLabel->Location = System::Drawing::Point(184, 203);
			this->resultLabel->Name = L"resultLabel";
			this->resultLabel->Size = System::Drawing::Size(212, 29);
			this->resultLabel->TabIndex = 19;
			// 
			// label4
			// 
			this->label4->AutoSize = true;
			this->label4->Font = (gcnew System::Drawing::Font(L"Microsoft Sans Serif", 13.8F, System::Drawing::FontStyle::Regular, System::Drawing::GraphicsUnit::Point,
				static_cast<System::Byte>(0)));
			this->label4->Location = System::Drawing::Point(12, 198);
			this->label4->Name = L"label4";
			this->label4->Size = System::Drawing::Size(150, 29);
			this->label4->TabIndex = 18;
			this->label4->Text = L"String Result";
			// 
			// toInsert_TextBox
			// 
			this->toInsert_TextBox->Location = System::Drawing::Point(520, 151);
			this->toInsert_TextBox->Name = L"toInsert_TextBox";
			this->toInsert_TextBox->Size = System::Drawing::Size(100, 22);
			this->toInsert_TextBox->TabIndex = 20;
			// 
			// subString_TextBox
			// 
			this->subString_TextBox->Location = System::Drawing::Point(629, 187);
			this->subString_TextBox->Name = L"subString_TextBox";
			this->subString_TextBox->Size = System::Drawing::Size(100, 22);
			this->subString_TextBox->TabIndex = 21;
			// 
			// firstString_TextBox
			// 
			this->firstString_TextBox->Location = System::Drawing::Point(187, 38);
			this->firstString_TextBox->Name = L"firstString_TextBox";
			this->firstString_TextBox->Size = System::Drawing::Size(209, 22);
			this->firstString_TextBox->TabIndex = 22;
			// 
			// secondString_TextBox
			// 
			this->secondString_TextBox->Location = System::Drawing::Point(187, 94);
			this->secondString_TextBox->Name = L"secondString_TextBox";
			this->secondString_TextBox->Size = System::Drawing::Size(209, 22);
			this->secondString_TextBox->TabIndex = 23;
			// 
			// confirm_Button
			// 
			this->confirm_Button->Location = System::Drawing::Point(321, 145);
			this->confirm_Button->Name = L"confirm_Button";
			this->confirm_Button->Size = System::Drawing::Size(75, 23);
			this->confirm_Button->TabIndex = 24;
			this->confirm_Button->Text = L"Confirm";
			this->confirm_Button->UseVisualStyleBackColor = true;
			this->confirm_Button->Click += gcnew System::EventHandler(this, &MyForm::confirm_Button_Click);
			// 
			// label2
			// 
			this->label2->AutoSize = true;
			this->label2->Location = System::Drawing::Point(626, 157);
			this->label2->Name = L"label2";
			this->label2->Size = System::Drawing::Size(18, 16);
			this->label2->TabIndex = 25;
			this->label2->Text = L"at";
			// 
			// position_TextBox
			// 
			this->position_TextBox->Location = System::Drawing::Point(650, 154);
			this->position_TextBox->Name = L"position_TextBox";
			this->position_TextBox->Size = System::Drawing::Size(51, 22);
			this->position_TextBox->TabIndex = 26;
			// 
			// MyForm
			// 
			this->AutoScaleDimensions = System::Drawing::SizeF(8, 16);
			this->AutoScaleMode = System::Windows::Forms::AutoScaleMode::Font;
			this->AutoSize = true;
			this->ClientSize = System::Drawing::Size(882, 442);
			this->Controls->Add(this->position_TextBox);
			this->Controls->Add(this->label2);
			this->Controls->Add(this->confirm_Button);
			this->Controls->Add(this->secondString_TextBox);
			this->Controls->Add(this->firstString_TextBox);
			this->Controls->Add(this->subString_TextBox);
			this->Controls->Add(this->toInsert_TextBox);
			this->Controls->Add(this->resultLabel);
			this->Controls->Add(this->label4);
			this->Controls->Add(this->entry_TextBox);
			this->Controls->Add(this->countEntries_Button);
			this->Controls->Add(this->substractStrings_btn);
			this->Controls->Add(this->addString_btn);
			this->Controls->Add(this->secondArray_rb);
			this->Controls->Add(this->label3);
			this->Controls->Add(this->firstArray_rb);
			this->Controls->Add(this->subString_Button);
			this->Controls->Add(this->insert_Button);
			this->Controls->Add(this->sortDescending_Button);
			this->Controls->Add(this->sortAscending_Button);
			this->Controls->Add(this->deleteFrom_Button);
			this->Controls->Add(this->deleteVal_TextBox);
			this->Controls->Add(this->label1);
			this->Name = L"MyForm";
			this->Text = L"MyForm";
			this->Load += gcnew System::EventHandler(this, &MyForm::MyForm_Load);
			this->ResumeLayout(false);
			this->PerformLayout();

		}
#pragma endregion

	private: CString* Strings;
	private: int SelectedIndex;
	private: System::Void OnChangeCheck(System::Object^ sender, System::EventArgs^ e);

	private: System::Void MyForm_Load(System::Object^ sender, System::EventArgs^ e);


	private: System::Void deleteFrom_Button_Click(System::Object^ sender, System::EventArgs^ e);
private: System::Void confirm_Button_Click(System::Object^ sender, System::EventArgs^ e);
private: System::Void countEntries_Button_Click(System::Object^ sender, System::EventArgs^ e);
private: System::Void sortAscending_Button_Click(System::Object^ sender, System::EventArgs^ e);
private: System::Void sortDescending_Button_Click(System::Object^ sender, System::EventArgs^ e);
private: System::Void insert_Button_Click(System::Object^ sender, System::EventArgs^ e);
private: System::Void subString_Button_Click(System::Object^ sender, System::EventArgs^ e);
private: System::Void addString_btn_Click(System::Object^ sender, System::EventArgs^ e);
private: System::Void substractStrings_btn_Click(System::Object^ sender, System::EventArgs^ e);
};
}
