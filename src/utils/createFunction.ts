import desintegarObeject from "./utilsGet";

export function dateG(year: number, month: number, day: number, hours: number, minutes: number){
    const newdate = new Date(year, month, day, hours, minutes)
    return newdate
}

export async function create(dat: Date, table: number, name: string, ativa: string): Promise<any> {
    try {
      const res = await fetch('/api/agendCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',          
        },
        body: JSON.stringify({dat, table, name, ativa}),
      });
  
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.statusText}`)
      }
  
      const data = await res.json()      
      return data
    } catch (error) {      
      throw error
    }
}

export async  function deletee(id: number): Promise<any> {
  try {
    const response = await fetch('/api/agendDelete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), 
    });
    if (!response.ok) {
      throw new Error('Erro ao remover registro do banco de dados')
    }      
    const data = await response.json();      
    return data 
  } catch (error) {
    return new Error('Erro ao remover registro do banco de dados')
  }
}

export async function fetchData(): Promise<any> {
  try {
    const response = await fetch('/api/getAgends')
    if (!response.ok) {
      throw new Error('Erro ao buscar dados da API')
    }
    const data = await response.json()            
    return data                            
  } catch (error) {
    throw new Error('Erro ao buscar dados da API:')          
  }
} 

export async function updateData(id: number): Promise<any> {
    try {
      const response = await fetch('/api/agendUpdate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: id,
            ativa: 'Não' 
        }), 
      })
      if (!response.ok) {
        throw new Error('Erro ao mudar status do agendamento')
      }        
      const updatedData = await response.json()
      const [updatedRecord] = desintegarObeject(updatedData)                                  
      return updatedRecord                 
    } catch (error) {
      console.error('Erro ao atualizar registro no banco de dados', error)
    }
}
