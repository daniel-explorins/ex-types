
export class ESParams {

    private _defaultFilter: FilterObject;
    private _defaultFieldObject: Object;

    public highlight: any = {
        pre_tags: ['<span class=\'highlight__found\'>'],
        post_tags: ['</span>'],
        require_field_match: false,
        fields: []
    };

    // aggregations -> count del field que le pase (ej: players)

    private _limit: number = 10;
    private _offset: number = 0;
    public filter: FilterObject;
    public aggregations: Object;
    private queryFields: string[];
    public fields: string[];
    private hightlightFields: string[];
    // Filter-sidebar filters are stored here.
    public query: QueryObject;
    private from: number = 0;
    private size: number = 12;

    // private esParams: ESParamsArguments;
        
    

    // private esParams$ : BehaviorSubject<ESParamsArguments>;

    constructor( args: ESParamsArguments ) {
        let { _limit, _offset, aggregations, fields, filter, hightlightFields, query, queryFields, from, size } = args;
        this._limit = _limit;
        this._offset = _offset;
        this.aggregations = aggregations;
        this.fields = fields;
        this.hightlightFields = hightlightFields;
        this.queryFields = queryFields;

        if (!filter) {
            this.filter = {
                bool: {
                    must: [],
                    should: []
                }
            };
        } else {
            this.filter = filter;
        }

        this._defaultFilter = JSON.parse(JSON.stringify(this.filter));

        this._defaultFieldObject = {
            'no_match_size': 150,
            'number_of_fragments': 0
        };

        if (!query) {
            this.query = {
                bool: {
                    must: [],
                    should: [],
                    filter: []
                }
            };
        } else {
            this.query = query;
        }

        if (!from) {
            this.from = 0;
        } else {
            this.from = from;
        }

        if (!size) {
            this.size = 300;
        } else {
            this.size = size;
        }


        if (hightlightFields || queryFields) {
            this.createHightlightFields(hightlightFields || queryFields);
        }

    }

    private getCurrentEsParams(): ESParamsRequest {
        return this.getParams()
    }
    public addCurrentFilterGeoDistance(location: GeoDistance, tolerance?: Tolerance): void {
        this.addFilterGeoDistance(location,tolerance)
    }

    public addCurrentFilterDateRange(value: number[], tolerance?: Tolerance): void {
        this.addFilterDateRange(value, tolerance)
    }





    private setQueryFields (queryFields: string[]) {
        this.queryFields = queryFields;
    }

    /*
    * Devuelve un objeto con los parámtros que nos interesan para una llamada a ES
     */
    public getParams(): ESParamsRequest {
        return {
            fields: this.fields,
            limit: this.limit,
            offset: this.offset,
            aggregations: this.aggregations,
            highlight: this.highlight,
            filter: this.filter,
            query: this.query,
            from: this.from,
            size: this.size
        };
    }
    
    public getQueryParam() {
        return this.query
    }

    private addPaginationIndex(index: number) {
        this.from = index;
    }

    private addPaginationItemsNumber() {

    }

    /*
    * Añade el filtro geo distance
    * @location: object with lat, lng and distance
     */
    private addFilterGeoDistance(location: GeoDistance, tolerance?: Tolerance) {
        try {
            let filterTolerance = tolerance || 'must';

            let distance = location.distance !== undefined && location.distance < 100000 ? location.distance : '100000';
            let geoDistance = {
                geo_distance : {
                    location: {
                        lat: location.lat,
                        lon: location.lng
                    },
                    distance: distance + 'km'
                }
            }

            // this.filter.bool[filterTolerance].push(geoDistance);
            this.query.bool[filterTolerance] =  this.query.bool[filterTolerance].filter(filter => !filter.geo_distance);
            this.query.bool[filterTolerance].push(geoDistance);
        } catch (e) {
            console.error(e);
        }
        
    }

    /*
    * Añade o sustituye un parámetro del filtro
    * @field: nombre del parámetro a añadir/sustituir
    * @value: valor de parámetro
    * @tolerance: puede ser 'must' o 'should'
     */
    private addFilterTerm(field: string, value: any, tolerance?: Tolerance) {
        let index = this.getFilterIndex(field, tolerance),
            filterTolerance = tolerance || 'must';

        try {
            if (index !== -1) {
                this.filter.bool[filterTolerance][index].term[field] = value;
            } else {
                const term = {};
                term[field] = value;
                this.filter.bool[filterTolerance].push({
                    term: term
                });
            }
            
        } catch (e) {
            console.error(e);
        }
    }


    /*
    * Añade o sustituye un parámetro del filtro
    * @field: nombre del parámetro a añadir/sustituir
    * @value: valor de parámetro
    * @tolerance: puede ser 'must' o 'should'
     */
    private addFilterTerms(field: string, value: any, tolerance?: Tolerance) {
        let index = this.getFilterIndex(field, tolerance),
            filterTolerance = tolerance || 'must';

        try {
            if (index !== -1) {
                this.filter.bool[filterTolerance][index].terms[field] = value;
            } else {
                const terms = {};
                terms[field] = value;
                this.filter.bool[filterTolerance].push({
                    terms: terms
                });
            }
        } catch (e) {
            console.error(e);
        }
    }


    /*
    * Añade o sustituye un parámetro del filtro
    * @field: nombre del parámetro a añadir/sustituir
    * @value: valor de parámetro
    * @tolerance: puede ser 'must' o 'should'
     */
    public addOptionalQueryTerm(options: {[key: string]: string}, mustMatchNumber: number) {
        console.log(Object.keys(options)[0])
        let index = this.getQueryTermIndex(Object.keys(options)[0], 'should'),
            filterTolerance = 'should';
        console.log(index)

        try {
            if (index !== -1) {
                this.query.bool[filterTolerance][index].term[Object.keys(options)[0]] = options[Object.keys(options)[0]];
            } else {
                const term = {};
                term[Object.keys(options)[0]] = options[Object.keys(options)[0]];
                this.query.bool[filterTolerance].push({
                    term: term
                });
                console.log(term)
                console.log(options)
                console.log(this.filter.bool)
            }
            
            
        } catch (e) {
            console.error(e);
        }
        this.query.bool['minimum_should_match'] = mustMatchNumber;
    }


    /*
    * Añade o sustituye un parámetro del filtro
    * @field: nombre del parámetro a añadir/sustituir
    * @value: valor de parámetro
    * @tolerance: puede ser 'must' o 'should'
     */
    public addFilterRange(field: string, value: number[], tolerance?: Tolerance) {
        let index = this.getFilterQueryIndex(field, tolerance),
            filterTolerance = tolerance || 'must';

        try {
            if (index !== -1) {
                this.query.bool[filterTolerance][index].terms[field] = {
                    'gte' : value[0],
                    'lte' : value[1]
                };
            } else {
                const range = {};
                range[field] = {
                    'gte' : value[0],
                    'lte' : value[1]
                };
                this.query.bool[filterTolerance].push({
                    range: range
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    /*
    * Añade o sustituye un parámetro del filtro
    * @field: nombre del parámetro a añadir/sustituir
    * @value: valor de parámetro
    * @tolerance: puede ser 'must' o 'should'
     */
    private addFilterDateRange(value: number[], tolerance?: Tolerance) {
        let index = this.getFilterQueryIndex('nested', tolerance);
        let filterTolerance = tolerance || 'must';

        try {
            if (index !== -1) {
                this.query.bool[filterTolerance][index].nested = {
                    'path' : 'occurrence.ranges',
                    'query' : [
                        {
                            'range' : {
                                'occurrence.ranges.start' : {
                                    'gte' : value[0],
                                    'lte' : value[1]
                                }
                            }
                        },
                        {
                            'range' : {
                                'occurrence.ranges.end' : {
                                    'gte' : value[0],
                                    'lte' : value[1]
                                }
                            }
                        }
                    ]
                };
            } else {
                this.query.bool[filterTolerance].push({
                    'nested' : {
                        'path' : 'occurrence.ranges',
                        'query' : [
                            {
                                'range' : {
                                    'occurrence.ranges.start' : {
                                        'gte' : value[0],
                                        'lte' : value[1]
                                    }
                                }
                            },
                            {
                                'range' : {
                                    'occurrence.ranges.end' : {
                                        'gte' : value[0],
                                        'lte' : value[1]
                                    }
                                }
                            }
                        ]
                    }
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    /*
    * Añade o sustituye un parámetro del filtro
    * @param value string - valor de parámetro
    * @param tolerance 'filter'|'must'|'should'
     */
    private addFilterRangeTime(value: number[], tolerance?: Tolerance) {
        let indexStartTime  = this.getFilterIndex('startTime', tolerance);
        let indexEndTime    = this.getFilterIndex('endTime', tolerance);

        let filterTolerance = tolerance || 'must';

        try {
           /*  if (index !== -1) {
                this.query.bool[filterTolerance][index].terms['startTime'] = {
                    'gte' : value[0],
                    'lte' : value[1]
                };
                this.query.bool[filterTolerance][index].terms['endTime'] = {
                    'gte' : value[0],
                    'lte' : value[1]
                };
            } else { */


                // TODO: no hacer push siempre.
                let range = {};

                if (indexStartTime !== -1) {
                    this.query.bool[filterTolerance][indexStartTime].terms['startTime'] = {
                        'gte' : value[0],
                        'lte' : value[1]
                    };
                } else {
                    range['startTime'] = {
                        'gte' : value[0],
                        'lte' : value[1]
                    };
                    this.query.bool[filterTolerance].push({
                        range: range
                    });
                }

                if (indexEndTime !== -1) {
                    this.query.bool[filterTolerance][indexEndTime].terms['endTime'] = {
                        'gte' : value[0],
                        'lte' : value[1]
                    };
                } else {
                    range['endTime'] = {
                        'gte' : value[0],
                        'lte' : value[1]
                    };
                    this.query.bool[filterTolerance].push({
                        range: range
                    });
                }

                // range = {};
                // range['endTime'] = {
                //     'gte' : value[0],
                //     'lte' : value[1]
                // };
                // this.query.bool[filterTolerance].push({
                //     range: range
                // });
            // }
        } catch (e) {
            console.error(e);
        }
    }

    /*
     * Elimina una parámetro si existe
     * @field: nombre del parámetro a eliminar
     */
    private removeFilterTerm(field: string, tolerance?: Tolerance) {
        let index = this.getFilterIndex(field, tolerance),
            filterTolerance = tolerance || 'must';

        try {
            if (index !== -1) {
                this.filter.bool[filterTolerance].splice(index, 1);
            }
        } catch (e) {
            console.error(e);
        }
    }

    /*
     * Elimina una parámetro si existe
     * @field: nombre del parámetro a eliminar
     */
    private removeFilterRange(field: string, tolerance?: Tolerance) {
        let index = -1 , filterTolerance = tolerance || 'must';

        try {
            for (let i = 0; i < this.query.bool[filterTolerance].length; i++) {
                if (this.query.bool[filterTolerance][i].range && this.query.bool[filterTolerance][i].range[field] !== undefined) {
                    index = i;
                }
            }
            if (index !== -1 ) {
                this.query.bool[filterTolerance].splice(index, 1);
            }

        } catch (e) {
            console.error(e);
        }
    }

    /*
     * Añade o sustituye un parámetro del filtro
     * @field: nombre del parámetro a añadir/sustituir
     * @value: valor de parámetro
     * @tolerance: puede ser 'must' o 'should'
     */
    private addQueryTerm(field: string, value: any, tolerance?: Tolerance) {
        let index = this.getQueryIndex(field, tolerance),
            filterTolerance = tolerance || 'should';

        try {
            if (index !== -1) {
                this.query.bool[filterTolerance][index].match[field] = value;
            } else {
                const terms = {};
                terms[field] = value;
                this.query.bool[filterTolerance].push({
                    match: terms
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    /*
     * Añade o sustituye un parámetro del filtro
     * @field: nombre del parámetro a añadir/sustituir
     * @value: valor de parámetro
     * @tolerance: puede ser 'must' o 'should'
     */
    public addQueryTerms(field: string, value: any, tolerance?: Tolerance, mustMatchNumber?: number) {
        let index = this.getQueryTermsIndex(field, tolerance),
            filterTolerance = tolerance || 'should';

        try {
            if (index !== -1) {
                this.query.bool[filterTolerance][index].terms[field].push(value);
            } else {
                const terms = {};
                terms[field] = value;
                this.query.bool[filterTolerance].push({ terms });
            }
        } catch (e) {
            console.error(e);
        }
        if(filterTolerance === 'should') {
            this.query.bool['minimum_should_match'] = mustMatchNumber;
        }
    }

    /*
     * Añade un objeto al filtro
     * @oject: objeto a añadir
     * @tolerance: puede ser 'must' o 'should'
     */
    public addQueryTermsObject(object: any, tolerance?: Tolerance) {
        let filterTolerance = tolerance || 'should';

        try {
            this.query.bool[filterTolerance].push(object);
        } catch (e) {
            console.error(e);
        }
    }

    /*
     * Añade o sustituye un parámetro del filtro
     * @field: nombre del parámetro a añadir/sustituir
     * @value: valor de parámetro
     * @tolerance: puede ser 'must' o 'should'
     */
    private addArrayQueryTerms(field: string, value: any, tolerance?: Tolerance) {
        let index = this.getQueryIndex(field, tolerance),
            filterTolerance = tolerance || 'should';

        try {
            if (index !== -1) {
                this.query.bool[filterTolerance][index].match[field].query += ' ' + value;
            } else {
                const terms = {};
                terms[field] = {
                    query: value,
                    operator: 'and',
                };
                this.query.bool[filterTolerance].push({
                    match: terms
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    /*
     * Elimina una parámetro si existe
     * @field: nombre del parámetro a eliminar
     */
    private removeQueryTerm(field: string, tolerance?: Tolerance) {
        let index = this.getQueryIndex(field, tolerance),
            filterTolerance = tolerance || 'should';

        try {
            if (index !== -1) {
                this.query.bool[filterTolerance].splice(index, 1);
            }
        } catch (e) {
            console.error(e);
        }
    }

    /*
    * Añade un criterio de búsqueda libre
    * @value: texto a buscar
     */
    private addFreeSearchTerm(value: string) {
        this.query = {
            multi_match: {
                query: value,
                fields: this.queryFields
            }
        };
    }

    /*
    * Elimina el criterio de búsqueda libre
     */
    private removeFreeSearchTerm() {
        delete this.query;
    }

    /**
     * Add exists paramenter
     * @param field
     * @param tolerance
     */
    private addExistsFilter(field: string, tolerance?: Tolerance) {
        let index = this.getExistIndex(field, tolerance),
            queryTolerance = tolerance || 'must';

        try {
            if (index !== -1) {
                this.query.bool[queryTolerance].exists.field = field;
            } else {
                this.query.bool[queryTolerance].push({
                    exists: {
                        field: field
                    }
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Elimina una parámetro si existe
     * @field: nombre del parámetro a eliminar
     */
    private removeExistsFilter(field: string, tolerance?: Tolerance) {
        let index = this.getExistIndex(field, tolerance),
            queryTolerance = tolerance || 'must';

        try {
            if (index !== -1) {
                this.query.bool[queryTolerance].splice(index, 1);
            }
        } catch (e) {
            console.error(e);
        }
    }

    /*
    * Reestablece los parámetros del filtro
     */
    private reset() {
        this.limit = 10;
        this.offset = 0;
        this.filter = JSON.parse(JSON.stringify(this._defaultFilter));
        this.query = {};
    }

    /*
     * Devuelve el índice de un parámetro si existe. Si no devuelve -1
     * @field: nombre del parámetro
     */
    private getFilterQueryIndex(field: string, tolerance?: Tolerance): number {
        let filterTolerance = tolerance || 'must';

        try {
            for (let i = 0; i < this.query.bool[filterTolerance].length; i++) {
                let item = this.query.bool[filterTolerance][i];
                if (item.terms && item.terms[field]) {
                    return i;
                } else if (item.term && item.term[field]) {
                    return i;
                }
            }
            return -1;
        } catch (e) {
            console.error(e);
            return -1;
        }
    }

    private getFilterIndex(field: string, tolerance?: Tolerance): number {
        let filterTolerance = tolerance || 'must';

        try {
            for (let i = 0; i < this.filter.bool[filterTolerance].length; i++) {
                let item = this.filter.bool[filterTolerance][i];
                if (item.terms && item.terms[field]) {
                    return i;
                } else if (item.term && item.term[field]) {
                    return i;
                }
            }
            return -1;
        } catch (e) {
            console.error(e);
            return -1;
        }
    }

    /*
     * Devuelve el índice de un parámetro si existe. Si no devuelve -1
     * @field: nombre del parámetro
     */
    private getQueryIndex(field: string, tolerance?: Tolerance): number {
        let filterTolerance = tolerance || 'should';

        try {
            for (let i = 0; i < this.query.bool[filterTolerance].length; i++) {
                let item = this.query.bool[filterTolerance][i];
                console.log(item)
                console.log(field)
                // console.log(item.match[field])
                if (item.match[field]) {
                    return i;
                }
            }
            return -1;
        } catch (e) {
            console.error(e);
            return -1;
        }
    }

    /*
     * Devuelve el índice de un parámetro si existe. Si no devuelve -1
     * @field: nombre del parámetro
     */
    private getQueryTermIndex(field: string, tolerance?: Tolerance): number {
        let filterTolerance = tolerance || 'should';

        try {
            for (let i = 0; i < this.query.bool[filterTolerance].length; i++) {
                let item = this.query.bool[filterTolerance][i];
                console.log(item)
                console.log(field)
                // console.log(item.match[field])
                if (item.term[field]) {
                    return i;
                }
            }
            return -1;
        } catch (e) {
            console.error(e);
            return -1;
        }
    }

    /*
     * Devuelve el índice de un parámetro si existe. Si no devuelve -1
     * @field: nombre del parámetro
     */
    private getQueryTermsIndex(field: string, tolerance?: Tolerance): number {
        let filterTolerance = tolerance || 'should';

        try {
            for (let i = 0; i < this.query.bool[filterTolerance].length; i++) {
                let item = this.query.bool[filterTolerance][i];
                if (item.terms && item.terms[field]) {
                    return i;
                }
            }
            return -1;
        } catch (e) {
            console.error(e);
            return -1;
        }
    }

    private getExistIndex(field: string, tolerance?: Tolerance): number {
        let queryTolerance = tolerance || 'must';
        try {
            for (let i = 0; i < this.query.bool[queryTolerance].length; i++) {
                let item = this.query.bool[queryTolerance][i];
                if (item.exists.field === field) {
                    return i;
                }
            }
            return -1;
        } catch (e) {
            console.error(e);
            return -1;
        }
    }

    /*
     * Crea los parámtros para el highlight
     * @fields: array de strings con los nombres de los parámtros a destacar
     */
    private createHightlightFields(fields: string[]) {
        this.highlight.fields = [];
        for (let i = 0; i < fields.length; i++) {
            let fieldObject: Object = {};
            fieldObject[fields[i]] = this._defaultFieldObject;

            this.highlight.fields.push(fieldObject);
        }
    }

    /* Getters y Setters */

    get limit(): number {
        return this._limit;
    }

    set limit(newLimit: number) {
        this._limit = newLimit;
    }

    get offset(): number {
        return this._offset;
    }

    set offset(newOffset: number) {
        this._offset = newOffset;
    }

}

export interface GeoDistance {
    distance: number;
    lat: number;
    lng: number;
}

export type Tolerance = 'must' | 'should' | 'filter' | 'must_not';

export interface FilterObject {
    bool: {[key in Tolerance]?: any[]};
}

export interface QueryObject {
    bool?: {[key in Tolerance]?: any};
    multi_match?: any;
}

export interface ESParamsArguments {
    _limit: number;
    _offset: number;
    filter?: FilterObject;
    aggregations?: Object;
    queryFields?: string[];
    fields?: string[];
    hightlightFields?: string[];
    query?: QueryObject;
    from?: number;
    size?: number;
}

export interface ESParamsRequest {
    fields?: string[];
    limit?: number;
    offset?: number;
    aggregations?: Object;
    highlight?: any;
    filter?: FilterObject;
    query?: QueryObject;
    from?: number;
    size?: number;
}
