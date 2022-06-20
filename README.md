# filter-metadata
Sample using ts compiler to identify externally defined items


Taking a look at how to identify what native code is accessed from typescript using [ts-morph](https://github.com/dsherret/ts-morph]).

Basically trawl for types which have their definitions generated from the native types.

To execute:

```
npx ts-node ./tesc/compile.ts
```
