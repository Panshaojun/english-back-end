```typescript
module.exports = {
  datastore?: string,
  tableName?: string,
  attributes: {
    [key in string]:{
        type:"string" | "number" | "boolean" | "json" | "ref",  //sails取得值时，该解析成什么
        required?: boolean,                                     //表示创建时必须的元素，sails会帮助检查
        unique?: boolean,
        columnName?: string,                                    //表对应的字段，默认和【key】一致
        columnType?: string,                                    //取决于数据库，未填写取决于上面的type
        defaultsTo?: any
    },
  }
};
````