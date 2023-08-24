# Shared Lib

This is a dummy angular library to test the _singleton pattern_ between microfronts, it only expose an Angular Service called SharedLibService, where it only has a property called **dummyUUID** that is asignated in the constructor. So if the library is singleton, the service is also singleton, and if it's injected in many modules, components, etc, the **dummyUUID** will always be the same.
