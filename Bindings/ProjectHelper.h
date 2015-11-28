#include "GDCore/Project/Project.h"
#include "GDCore/Project/Layout.h"
#include "GDCore/Project/Project.h"
#include "GDCore/Extensions/Platform.h"
#include "GDCore/IDE/PlatformManager.h"
#include "GDCore/TinyXml/tinyxml.h"
#include "GDCore/Tools/VersionWrapper.h"
#include "GDCore/Extensions/Platform.h"
#include "GDCore/Extensions/Platform.h"
#include "GDCore/Project/InitialInstancesContainer.h"
#include "GDJS/Extensions/JsPlatform.h"

using namespace gdjs;
using namespace gd;

/**
 * \brief Helper functions related to projects and initialization.
 */
class ProjectHelper {
public:
	static gd::Project & CreateNewGDJSProject()
	{
		Project * project = new Project;
		project->AddPlatform(JsPlatform::Get());

		return *project;
	}

	/**
	 * \brief Initialize the JS platform.
	 */
	static void InitializePlatforms()
	{
		static bool initialized = false;
		if (!initialized) {
			std::cout << "libGD.js based on GDevelop " << VersionWrapper::FullString() << std::endl;
		} else {
			std::cout << "ERROR: You're calling initializePlatforms again, but initialization was already done!" << std::endl;
			return;
		}

		initialized = true;
		std::cout << "Initializing GDJS platform..." << std::endl;
	    std::shared_ptr<gd::Platform> platform(&JsPlatform::Get());
	    gd::PlatformManager::Get()->AddPlatform(platform);
		std::cout << "Platform initialization ended." << std::endl;
	}
};
