#include <string>
#include <GDCore/PlatformDefinition/Project.h>
#include <GDCore/PlatformDefinition/Layout.h>
#include <GDCore/PlatformDefinition/InitialInstance.h>
#include <GDCore/PlatformDefinition/InitialInstancesContainer.h>
#include "ProjectHelper.h"

class InitialInstanceJSFunctorWrapper : public gd::InitialInstanceFunctor {
public:
    InitialInstanceJSFunctorWrapper() {};

    virtual void operator()(gd::InitialInstance * instance) {
    	invoke(instance);
    };

    virtual void invoke(gd::InitialInstance * instance) {
    };
};

//Declares typedef for std::vector
typedef std::vector<std::string> VectorString;

//Customize some functions implementation thanks to WRAPPED_* macros
//The original names will be reconstructed in the js file (see postjs.js)
#define WRAPPED_set(a, b) at(a) = b
#define STATIC_CreateNewGDJSProject CreateNewGDJSProject
#define STATIC_InitializePlatforms InitializePlatforms

// We don't use prefix in .idl file to workaround a webidl_binder.py bug
// that can't find in its list of interfaces a class which has a prefix.
using namespace gd;
using namespace std;
#include "glue.cpp"
