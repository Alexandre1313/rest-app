"use client"
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import 'react-datepicker/dist/react-datepicker.css'
import dynamic from 'next/dynamic'
import ptBR from 'date-fns/locale/pt-BR'
import styles from "../styles/dateSelector.module.css"


const DynamicDatePicker = dynamic(() => import('react-datepicker'), {
  ssr: false,
});

const DateSelector = forwardRef((props, ref) => {
  const [selectedDate, setSelectedDate] = useState();

  const today = new Date();
  const minTime = new Date(today.setHours(18, 30))
  const maxTime = new Date(today.setHours(23, 59)) 

  const handleDateChange = (date: any) => {
    setSelectedDate(date);    
  };

  const isSunday = (date: any) => {
    return date.getDay() !== 0
  };

  useImperativeHandle(ref, () => ({
    getSelectedDate: () => selectedDate,
  }));

  return (
    <div className={styles.divDS}>
      <DynamicDatePicker 
          selected={selectedDate} 
          onChange={handleDateChange} 
          onFocus={() => {}}
          dateFormat="dd/MM/yyyy"
          locale={ptBR}
          filterDate={isSunday}
          placeholderText="Click aqui e escolha uma data"          
          //showTimeSelect  
          //timeIntervals={1}  
          timeFormat="HH:mm" 
          minDate={today}
          //minTime={minTime}
          //maxTime={maxTime}
          //timeCaption="Hora"           
      />
    </div>
  );
})

DateSelector.displayName = 'DateSelector'

export default DateSelector
