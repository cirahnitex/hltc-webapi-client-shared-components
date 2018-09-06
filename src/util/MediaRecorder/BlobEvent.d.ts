interface BlobEvent extends Event {
    data: Blob;
    timeCode: number;
}
interface BlobEventConstructor {
    new (name:string, obj:{data:Blob}):BlobEvent;
    readonly prototype:BlobEvent;
}
declare var BlobEvent:BlobEventConstructor;
