







export default function DataLine(params:{label:string, data:any}) {

    return (
        <div className={'bg-blue-200 text-blue-950 flex rounded-sm shadow-lg p-2 gap-3'}>
            <p className={'font-bold flex-grow'}>{params.label}</p>
            <p>{params.data}</p>
        </div>
    );

}