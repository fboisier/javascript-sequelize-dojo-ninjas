try {
    
    try {

        let divisor = 0;
        let numero = 100;
    
        if ( divisor == 0)
            throw new Error("Error de division por 0");
        
    } catch (error) {
        console.log("Nos caimos dentro del segundo TRY");
        throw error;
    }




    funcionQueNoExiste();
        


} catch (error) {

    console.log(error.message);

    console.error("Chuta... ocurrió un problema.");
    
}
