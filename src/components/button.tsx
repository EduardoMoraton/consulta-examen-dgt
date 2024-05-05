




export default function Button(
    params:{
        onClick:any,
        text:string
    }
    ) {


    return (
        <>
            <button className={'bg-blue-100 p-2 rounded-md hover:bg-blue-200 transition-all border-2 border-transparent hover:border-blue-400'}
            onClick={params.onClick}
            >
                {params.text}
            </button>
        </>
    );
}