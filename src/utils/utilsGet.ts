function converterHoursBB(horaUTC: string) {
    const dataUTC = new Date(`${horaUTC} UTC`)   
    dataUTC.setHours(dataUTC.getHours() - 3)   
    const horaFormatada = dataUTC.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour12: false,
    });  
    return horaFormatada
}

function converterHoursB(horaUTC: string) {
    function converterParaHorarioBrasilia(horaUTC: string) {
      const dataUTC = new Date(horaUTC)
      dataUTC.setHours(dataUTC.getHours() - 3)
      return dataUTC
    }  
    const dataHoraBrasilia = converterParaHorarioBrasilia(horaUTC)  
    const dia = dataHoraBrasilia.getDate().toString().padStart(2, '0')
    const mes = (dataHoraBrasilia.getMonth() + 1).toString().padStart(2, '0')
    const ano = dataHoraBrasilia.getFullYear()
    const hora = dataHoraBrasilia.getHours().toString().padStart(2, '0')
    const minutos = dataHoraBrasilia.getMinutes().toString().padStart(2, '0')
    const diaDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][dataHoraBrasilia.getDay()]    
    const arrayFormatado = [`${dia}/${mes}/${ano}`, `${hora}:${minutos}`, diaDaSemana]  
    return arrayFormatado;
  }

export interface ArrProps {
    id:number,
    data: string,
    mesa: number,
    name: string
    ativa: string
}

export default function desintegarObeject(arr: ArrProps[]){
    const arrO = arr.map(o => {
        const dataF = converterHoursB(o.data)
        return{
            id: o.id,
            data: dataF[0],
            horario: dataF[1],
            mesa: o.mesa,
            diaSemana: dataF[2],
            name: o.name,
            ativa: o.ativa
        }
    })
    return arrO
}
