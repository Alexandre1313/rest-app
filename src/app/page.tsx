"use client"
import React, { useRef, useState } from 'react'
import DateSelector from '../components/DateSelector'
import styles from "./page.module.css"
import { create } from "../utils/createFunction"
import Link from 'next/link'

const HomePage = () => {  
  const [selectedHour, setSelectedHour] = useState('18')
  const [selectedMinute, setSelectedMinute] = useState('00')
  const [selectedTable, setSelectedTable] = useState('1')
  const [infName, setName] = useState('')
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('')

  const dateSelectorRef = useRef<any>();  
  
  function newDate(){
    const selectedDate = dateSelectorRef.current.getSelectedDate()    
    const nexxtDate = new Date(selectedDate)    
    nexxtDate.setHours(parseInt(selectedHour, 10), parseInt(selectedMinute, 10))
    return nexxtDate
  }

  const inferHours = () => {
    const arr = []
    for (let index = 18; index < 24; index++) {
      let op = <option key={index} value={index}>{index}</option> 
      arr.push(op)   
    }
    return arr
  }

  const inferTable = () => {
    const arr = []
    for (let index = 1; index < 16; index++) {
      let op = <option key={index} value={index}>{index}</option> 
      arr.push(op)   
    }
    return arr
  }

  const inferMinutes = () => {
    const arr = []
    for (let index = 0; index < 60; index++) {
      let op = <option key={index} value={index}>{index}</option> 
      arr.push(op)   
    }
    return arr
  }

  const handleHourChange = (event: any) => {
    setSelectedHour(event.target.value);
  };

  const handleMinuteChange = (event: any) => {
    setSelectedMinute(event.target.value);   
  };

  const handleTableChange = (event: any) => {
    setSelectedTable(event.target.value);
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };   
  
  const handleButtonClick = async () => {        
    const nextDate = newDate()
    const dataA = new Date()    
    if(infName.trim() && nextDate >= dataA){
      try {
        if (dateSelectorRef.current) {
            const selectedDate = dateSelectorRef.current.getSelectedDate()
            const nextDate = new Date(selectedDate)
            nextDate.setHours(parseInt(selectedHour, 10), parseInt(selectedMinute, 10))        
            const name = infName.toUpperCase()
            const table = parseInt(selectedTable) 
            const activ = 'Sim'             
            const responseData = await create(nextDate, table, name, activ)           
            if(responseData.hasOwnProperty('mesa')){
                setColor('F')
                setMessage('Mesa já reservada, selecione outra mesa ou data diferente!')
                const timeout = setTimeout(function(){
                setMessage('')
                clearTimeout(timeout)
              }, 2000) 
              return  
            }
            setColor('v')
            setMessage('Agendamento realizado com sucesso!')
            const timeout = setTimeout(function(){
            setMessage('')
            clearTimeout(timeout)
          }, 2000)  
            return responseData      
      }} catch (error) {      
        return error
      }
  }else{
      setColor('F')
      setMessage('Ops! Algo deu errado...')
      const timeout = setTimeout(function(){
        setMessage('')
        clearTimeout(timeout)
      }, 2000)      
    }
  } 

  return (
    <div className={styles.main}>
      <div className={styles.subMain}>
      <h1>Agendamentos</h1>
      <div className={styles.divSubHours1}>
          <span>Nome completo</span>
          <input 
            className={styles.selectHours}
            id="name" 
            type='text'           
            value={infName}
            onChange={handleNameChange}              
          />
         </div> 
      <div className={styles.divdata}>
        <span>Data</span>
        <DateSelector ref={dateSelectorRef} />        
      </div>
      <div className={styles.divHours}>
        <div className={styles.divSubHours}>
          <span>Horas</span>
          <select 
            className={styles.selectHours}
            id="hoursSelect"            
            value={selectedHour}
            onChange={handleHourChange}
          >
            {inferHours()}
          </select>
         </div>
         <div className={styles.divSubHours}>
          <span>Minutos</span>
          <select 
            className={styles.selectHours}
            id="minutesSelect"            
            value={selectedMinute}
            onChange={handleMinuteChange}
          >
            {inferMinutes()}
          </select>
         </div> 
         <div className={styles.divSubHours}>
          <span>Mesa</span>
          <select 
            className={styles.selectHours}
            id="tableSelect"            
            value={selectedTable}
            onChange={handleTableChange}
          >
            {inferTable()}
          </select>
         </div>             
      </div> 
      </div> 
      <button type='button' className={styles.btnEnv} onClick={handleButtonClick}>Agendar</button> 
      <span className={`${styles.spanO} ${color === 'v' ? styles.spanV : styles.spanF}`}>{message}</span>  
      <Link legacyBehavior href="/dashboard">
      <a>
        <button type="button" className={styles.btnDs}>
          Dashboard
        </button>
      </a>
    </Link>  
    </div>    
  );
};

export default HomePage;
