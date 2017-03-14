cmake_minimum_required(VERSION 2.6)
cmake_policy(SET CMP0015 NEW)

project(libGD.js)

#Sanity checks
IF ("${CMAKE_BUILD_TYPE}" STREQUAL "")
  	message( "CMAKE_BUILD_TYPE is empty, assuming build type is Release" )
	set(CMAKE_BUILD_TYPE Release)
ENDIF()
if(NOT EMSCRIPTEN)
	error("You're trying to compile libGD.js without emscripten.")
endif()
SET( CMAKE_CXX_FLAGS  "${CMAKE_CXX_FLAGS} --memory-init-file 0" ) #Less efficient, but output a single JS file
# SET( CMAKE_CXX_FLAGS  "${CMAKE_CXX_FLAGS} -s ASSERTIONS=2 -s SAFE_HEAP=1" ) #Debug
# SET( CMAKE_CXX_FLAGS  "${CMAKE_CXX_FLAGS} -g4 -s DEMANGLE_SUPPORT=1" ) #Debug
SET( CMAKE_CXX_FLAGS  "${CMAKE_CXX_FLAGS} -O3 -s ALLOW_MEMORY_GROWTH=1" ) #Release

#Common directories:
###
set(GDCpp_include_dir ${GD_base_dir}/GDCpp)
set(GDCpp_lib_dir ${GD_base_dir}/Binaries/Output/${CMAKE_BUILD_TYPE}_${CMAKE_SYSTEM_NAME})
set(GDJS_include_dir ${GD_base_dir}/GDJS)
set(GDJS_lib_dir ${GD_base_dir}/Binaries/Output/${CMAKE_BUILD_TYPE}_${CMAKE_SYSTEM_NAME}/JsPlatform)

set(GDCpp_include_dir ${GDCpp_include_dir} PARENT_SCOPE) #Expose GDCpp directories to extensions for includes.
set(GDCpp_lib_dir ${GDCpp_lib_dir} PARENT_SCOPE)

#Dependencies on external libraries:
###
include_directories(${sfml_include_dir})
include_directories(${GDCORE_include_dir})
include_directories(${GDCpp_include_dir})
include_directories(${GDJS_include_dir})

#Defines
###
add_definitions( -DGD_IDE_ONLY )
add_definitions( -DGD_NO_WX_GUI ) #When compiling for the web, we do not want any GUI related feature.
IF(CMAKE_BUILD_TYPE MATCHES DEBUG)
	add_definitions( -DDEBUG )
	IF(WIN32)
		add_definitions( __WXDEBUG__ )
	ENDIF(WIN32)
ELSEIF ("${CMAKE_BUILD_TYPE}" STREQUAL "Release")
	add_definitions( -DRELEASE )
	add_definitions( -DBOOST_DISABLE_ASSERTS )
ELSE()
	add_definitions( -DDEV )
	add_definitions( -DBOOST_DISABLE_ASSERTS )
ENDIF(CMAKE_BUILD_TYPE MATCHES DEBUG)

add_definitions( -Dlinux )
add_definitions( -DLINUX )
add_definitions( -DGD_API= )
add_definitions( -DGD_CORE_API= )
add_definitions( -DGD_EXTENSION_API= )

#The target
###
include_directories(.)

add_library(
        GD
        SHARED
        "Bindings/Wrapper.cpp"
)
set_target_properties(GD PROPERTIES SUFFIX ".raw.js")
set(LIBRARY_OUTPUT_PATH ${GD_base_dir}/Binaries/Output/libGD.js/${CMAKE_BUILD_TYPE})
set(ARCHIVE_OUTPUT_PATH ${GD_base_dir}/Binaries/Output/libGD.js/${CMAKE_BUILD_TYPE})
set(RUNTIME_OUTPUT_PATH ${GD_base_dir}/Binaries/Output/libGD.js/${CMAKE_BUILD_TYPE})

#Linker files
###

target_link_libraries(GD GDCore)
target_link_libraries(GD GDJS)
target_link_libraries(GD PlatformBehavior)
target_link_libraries(GD DestroyOutsideBehavior)
target_link_libraries(GD TiledSpriteObject)
target_link_libraries(GD DraggableBehavior)
target_link_libraries(GD TopDownMovementBehavior)
target_link_libraries(GD TextObject)
target_link_libraries(GD AdMobObject)
target_link_libraries(GD PanelSpriteObject)
target_link_libraries(GD AnchorBehavior)
