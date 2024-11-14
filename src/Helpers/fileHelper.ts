export const convertFileToLink = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            resolve(evt.target?.result as string);
        };
        reader.onerror = () => {
            reject(new Error('Error reading the file'));
        };
        reader.readAsDataURL(file);
    });
};
export const convertFileToBlob = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            if(evt.target?.result instanceof ArrayBuffer){
                const blob = new Blob([evt.target.result], {type : file.type})
                resolve(blob);
            }else{
                reject(new Error('Error converting file to Blob'));
            }
            
        };
        reader.onerror = () => {
            reject(new Error('Error reading the file'));
        };
        reader.readAsArrayBuffer(file);
    });
};
export const linkToBlob = (url: string): Promise<Blob> => {
    return new Promise(async(resolve, reject)=>{
        try {
            const response = await fetch(url)
            if(!response.ok){
                reject(`La requete a echoué avec lestatus ${response.status}`)
            
            }
    
            //recuperer le corp de la reponse en tant que tableau tampon (Array Buffer)
            const buffer = await response.arrayBuffer()
    
            //creer un objet Blob à partir du tableau tampon
            const blob = new Blob([buffer])
            resolve(blob)
            
        } catch (error) {
            console.error('Erreur lors de la conversion du lien en Blob :', error)
            reject(error);
        }
    })
    
   
}
export const convertBlobToUrl = (blob: Blob): string => {
    return URL.createObjectURL(blob)
};


