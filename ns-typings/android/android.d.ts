/// <reference path="android-declarations.d.ts"/>

declare namespace org {
    export namespace jbc {
        export class Test {
            public static class: java.lang.Class<org.jbc.Test>;
            public doThing(): org.jbc.Test2;
            public doThing2(param0: org.jbc.Test2): void;
            public constructor();
        }
    }
}

declare namespace org {
    export namespace jbc {
        export class Test2 {
            public static class: java.lang.Class<org.jbc.Test2>;
            public constructor();
        }
    }
}

//Generics information:
