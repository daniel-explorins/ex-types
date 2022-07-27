

export interface MintbaseStore {
    baseUri: string
    id?: string
    minters?: any[] // TODO check
    name?: string
    owner: string
    symbol?: string
    things: any[] // TODO check
  }
  
  export interface MintbaseStoreReply {
    store: [MintbaseStore]
  }
  export interface MintbaseNftMetadata {
    title: string,
    description: string,
    media: string,
    media_hash: string,
    animation_hash: string,
    animation_url: string,
    youtube_url: string,
    document: any,
    document_hash: any,
    extra: any,
    external_url: string,
    category: string,
    type: string,
    visibility: string,
    media_type: string,
    animation_type: string,
    tags: any
    media_size: number
    animation_size: number
  }
  
  export interface  MintbaseThingToken {
      id: string
      ownerId: string
  }
  
  export interface MintbaseThing {
    id: string
    memo: string
    metaId: string
    storeId: string
    metadata: MintbaseNftMetadata
    tokens: MintbaseThingToken[]
    store: MintbaseStore
  }
  
  export interface MintbaseThingReply {
    thing: [MintbaseThing]     
   }