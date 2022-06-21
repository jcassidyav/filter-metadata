import { NewExpression, Project,PropertyNamedNode,ts, Node, MethodDeclaration } from 'ts-morph';

const project = new Project({
    tsConfigFilePath: './tsconfig.json',
    
});

const identified = new Map<string,{kind:string, declared:string}>();

function logDetails(node, symbol){

  const checkParent = symbol?.getDeclarations()[0]?.getParent()?.getKindName();

  const filePath = symbol?.getDeclarations()[0].getSourceFile().getFilePath();
  const kindName = symbol?.getDeclarations()[0].getKindName();
  const symbolName = symbol?.getFullyQualifiedName();

  if(false) {
    console.log("Parent is:",checkParent);

    console.log("Symbol declared in:",filePath);
    console.log("Symbol: symbol name",symbolName);
    console.log("Symbol Type", symbol?.getDeclaredType().getText())
    console.log("Location", node.getSourceFile().getFilePath());
    console.log("node Type",node.getType().getText() );
    console.log("node Type 2", symbol?.getDeclarations()[0].getKindName())
  }

  if(kindName === "ClassDeclaration" || kindName === "MethodDeclaration" || kindName ==="PropertyDeclaration") {
    identified.set(symbolName, {kind:kindName, declared: filePath});
  } 

}

project.getSourceFiles().forEach((sourceFile) => {


  sourceFile.getDescendants().forEach((node:Node<ts.Node>) => {
    if(node.getText() == "packageId"){
      console.log("Location package", node.getSourceFile().getFilePath())
    }


    const symbol = node.getSymbol();

    if(symbol){
      const decl = symbol?.getDeclarations();
      if(decl && decl.length > 0) {
        const filePath = symbol?.getDeclarations()[0].getSourceFile().getFilePath();
        const kindName = symbol?.getDeclarations()[0].getKindName();
        const symbolName = symbol?.getFullyQualifiedName();

        if(kindName === "ClassDeclaration" || kindName === "MethodDeclaration" || kindName ==="PropertyDeclaration") {

          if( (filePath?.includes("@nativescript/types") || filePath?.includes("android.d.ts")) &&  !node.getSourceFile().getFilePath().includes(".d.ts")) {
         //   console.log("********  Interesting Node ***************");
          //  console.log("node", node.getType().getCallSignatures()[0].getReturnType().getSymbol()?.getFullyQualifiedName())
            logDetails(node, symbol);

            if(kindName === "MethodDeclaration"){

              // get return type
              const decl = symbol?.getDeclarations()[0] as MethodDeclaration;
              const returnTypeSymbol = decl.getReturnType().getSymbol();
              const returnSymbolNode = decl.getReturnTypeNode();
           //   console.log("******   Return Type ************")
              logDetails(returnSymbolNode, returnTypeSymbol);

              // get param type
          //    console.log("******   Parameters ************")
              decl.getParameters().forEach((value) => {

                  logDetails(value.getTypeNode(), value.getType().getSymbol());

              })

            }

          }
        }
      }
   }
  });

});

console.log("*********** Identified *************")
identified.forEach((value, key) => {
  console.log(key, JSON.stringify(value));
})