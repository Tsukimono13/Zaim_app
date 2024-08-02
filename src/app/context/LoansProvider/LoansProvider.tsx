import { createContext, useContext, useState, ReactNode } from 'react';

export enum LoanStatus {
  Active = "Aктивный",
  Completed = "Завершенный",
  UnderReview = "На рассмотрении",
}
export interface LoanType {
  id: number;
  sum: number;
  return_sum: number;
  application_date: string;
  return_date: string;
  status: LoanStatus;
}

interface LoansContextType {
  loans: LoanType[];
  addLoan: (loan: Omit<LoanType, 'id' | 'application_date'>) => void;
}

const LoansContext = createContext<LoansContextType | undefined>(undefined);

export const useLoans = () => {
  const context = useContext(LoansContext);
  if (!context) {
    throw new Error('useLoans must be used within a LoansProvider');
  }
  return context;
};

const generateId = (loans: LoanType[]) => {
  return loans.length > 0 ? Math.max(...loans.map(loan => loan.id)) + 1 : 1;
};

const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); 
  const yyyy = today.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

export const LoansProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState<LoanType[]>([
    {
      id: 1,
      sum: 45000,
      return_sum: 49500,
      application_date: "25.07.24",
      return_date: "23.09.24",
      status: LoanStatus.Active,
    },
  ]);

  const addLoan = (loan: Omit<LoanType, 'id' | 'application_date'>) => {
    const newLoan: LoanType = {
      ...loan,
      id: generateId(loans),
      application_date: getCurrentDate(),
    };
    setLoans(prevLoans => [...prevLoans, newLoan]);
  };

  return (
    <LoansContext.Provider value={{ loans, addLoan }}>
      {children}
    </LoansContext.Provider>
  );
};
