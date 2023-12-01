"use client"
import { useEffect, useState } from "react"
import styles from "../styles/agend.module.css"
import Image from "next/image"
import desintegarObeject from "@/utils/utilsGet"
import { deletee, fetchData, updateData } from "@/utils/createFunction"
import useSWR from 'swr'

export interface RegisterProps {
    id?: number,
    data: string,
    horario: string,
    mesa: number,    
    diaSemana: string,
    name: string,
    ativa: string
    onDelete: (id: any) => void
    onLiberar: (id: any) => void
}

const Register = (props: RegisterProps) => {
    const [isAct, setIsact] = useState(false)
    const [isAct1, setIsact1] = useState(false)
    const [id, setId] = useState(props.id)
    const [data, setData] = useState(props.data)
    const [horario, setHorario] = useState(props.horario)
    const [mesa, setMesa] = useState(props.mesa)
    const [diaSemana, setDiaSemana] = useState(props.diaSemana)
    const [nome, setNome] = useState(props.name)
    const [ativa, setAtiva] = useState(props.ativa)

    const isActive = isAct ? styles.btnLL : styles.btnL
    const isActive1 = isAct1 ? styles.btnUU : styles.btnU

    const handleIsActChange = (event: any) => {
        setIsact(isAct ? false: true) 
        setIsact1(isAct1 ? false: true)       
    };

    const handleRemover = () => {                
        props.onDelete(id)
    }

    const handleLiberar = () => {                
        props.onLiberar(id)
    }
    
    const handleIdChange = (event: any) => {
        setId(event.target.value)
    }

    const handleDataChange = (event: any) => {
        setData(event.target.value)
    }

    const handleHorarioChange = (event: any) => {
        setHorario(event.target.value)
    }

    const handleMesaChange = (event: any) => {
        setMesa(event.target.value)
    }

    const handleDiaSemanaChange = (event: any) => {
        setDiaSemana(event.target.value)
    }

    const handleNomeChange = (event: any) => {
        setNome(event.target.value)
    }

    const handleAtivaChange = (event: any) => {
        setAtiva(event.target.value)
    }

    return (
        <div className={styles.divM}>
            <div className={styles.subDiv}>
                <span className={styles.spanImp}>Id:</span>
                <input
                    className={styles.imput}
                    type="text"
                    id="imp0"
                    value={id}
                    onChange={handleIdChange}
                />
            </div>   
            <div className={styles.subDiv}>
                <span className={styles.spanImp}>Data:</span>
                <input
                    className={styles.imput}
                    type="text"
                    id="imp1"
                    value={data}
                    onChange={handleDataChange}
                />
            </div> 
            <div className={styles.subDiv}>
                <span className={styles.spanImp}>Horário:</span>
                <input
                    className={styles.imput}
                    type="text"
                    id="imp2"
                    value={horario}
                    onChange={handleHorarioChange}
                />
            </div> 
            <div className={styles.subDiv}>
                <span className={styles.spanImp}>Mesa:</span>
                <input
                    className={styles.imput}
                    type="text"
                    id="imp3"
                    value={mesa}
                    onChange={handleMesaChange}
                />
            </div>    
            <div className={styles.subDiv}>
                <span className={styles.spanImp}>Dia:</span>
                <input
                    className={styles.imput}
                    type="text"
                    id="imp4"
                    value={diaSemana}
                    onChange={handleDiaSemanaChange}
                />
            </div>    
            <div className={styles.subDiv}>
                <span className={styles.spanImp}>Nome:</span>
                <input
                    className={styles.imput}
                    type="text"
                    id="imp5"
                    value={nome}
                    onChange={handleNomeChange}
                />                
            </div> 
            <div className={styles.subDiv}>
                <span className={styles.spanImp}>Ativa:</span>
                <input
                    className={styles.imput}
                    type="text"
                    id="imp6"
                    value={ativa}
                    onChange={handleAtivaChange}
                />                
            </div>     
            <div className={styles.subDivBtns}>
               <button className={styles.btnD} onClick={handleIsActChange}><Image height={20}  width={20} alt="destravar" src={'/unn.png'}/></button> 
               <button className={isActive1} onClick={handleLiberar}><Image height={20}  width={20} alt="liberar mesa" src={'/up.png'}/></button>               
               <button className={isActive} onClick={handleRemover}><Image height={20}  width={20} alt="delete" src={'/lx.png'}/></button>             
            </div>             
        </div>
    )
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Agend = () => {
    const [dadosDoBanco, setDadosDoBanco] = useState<any>([]) 
    const [atu, setAtu] = useState(false)

    /*const fecher = (url: string): Promise<RegisterProps[]> => fetch(url).then((res) => res.json())    
    const URL = '/api/getAgends'
    const {data, error, isLoading} = useSWR<RegisterProps[]>(URL, fecher)
    */

    useEffect(() => {  
        const fetchD = async () => {
            try {
                const data = await fetchData()
                const dadosOrdenados = data.sort((a: any, b: any) => b.id - a.id)
                const dadosTransformados = desintegarObeject(dadosOrdenados) 
                setDadosDoBanco(dadosTransformados)                                             
            } catch (error) {
                throw new Error('Erro ao buscar dados da API:')          
            }
        }        
        fetchD()        
    }, [atu])
    
    const handleRemoverDoBanco = async (id: number) => {
        const del = await deletee(id)
        const newData = dadosDoBanco.filter((item: any) => item.id !== id) 
        setAtu(atu ? false: true)              
    }     

    const handleLiberarMesa = async (id: number) => {
        try{
            const data = await updateData(id) 
            const newData = dadosDoBanco.map((item: any) => (item.id === data.id ? data : item))                                  
            setDadosDoBanco(newData) 
            setAtu(atu ? false: true)                  
        } catch (error) {
            console.error('Erro ao atualizar registro no banco de dados', error)
        }
    }     

    function listElements(){
        const arr = dadosDoBanco?.map((e: any) =>{
            return <Register
                key={e.id} 
                id={e.id}
                data={e.data}
                horario={e.horario}
                mesa={e.mesa}
                diaSemana={e.diaSemana}
                name={e.name}
                ativa={e.ativa}
                onDelete={handleRemoverDoBanco}
                onLiberar={handleLiberarMesa}
            />
        })        
        return arr        
    }

    return (
        <div className={styles.divMaster}>
            {listElements()}
        </div>
    )}

export default Agend
