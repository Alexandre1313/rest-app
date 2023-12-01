export async function getRegister(mesa: string) {
    try {        
        const res = await fetch(`/api/getRegister?mesa=${mesa}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.statusText}`)
        }

        const resp = await res.json();
        return resp
    } catch (error) {
        throw error
    }
}

export function compareDayaMonthYear(dateOne: string, dateTwo: string){
    const dat1 = dateOne.substring(0, 10)
    const dat2 = dateTwo.substring(0, 10)    
    return dat1 === dat2
}
