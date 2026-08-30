# Writing and Publishing Gradle Plugins

## Introduction

Gradle plugins allow you to package reusable build logic that can be shared across multiple projects. Whether you need to standardize logging configurations, implement custom code style checkers, or create specialized build tasks, Gradle plugins provide a clean, maintainable solution that can be applied consistently across all your microservices or projects.

By creating a plugin once and applying it everywhere, you can:

- Ensure consistency across projects
- Reduce duplication of build logic
- Centralize maintenance of common functionality
- Share your build innovations with others

This guide walks you through the complete process of creating, customizing, testing, and publishing your own Gradle plugin.

## Table of Contents

- Understanding Gradle Plugins
- Project Structure
- Flow of Gradle Plugin
- Configuring the Source Project to Publish as Plugin
- Customizing the Plugin
    - Maven Publishing
    - Gradle Plugin Portal Publishing
    - Creating Configurable Plugins with Extensions
- Testing Your Plugin
- Verifying the Published Plugin
- Troubleshooting Common Issues

## Understanding Gradle Plugins

Gradle plugins are packages of build logic that can be applied to Gradle projects. They can:

- Add new tasks
- Create configurations
- Apply conventions
- Extend the Gradle domain model
- Configure default behavior

Plugins encapsulate reusable functionality and allow it to be applied declaratively.

## Project Structure

A typical Gradle plugin project has the following structure:

```
plugin-project/
├── build.gradle.kts           # Plugin build configuration
├── settings.gradle.kts        # Project settings
└── src/
    ├── main/
    │   ├── kotlin/
    │   │   └── com/example/   # Your plugin code
    │   │       ├── MyPlugin.kt
    │   │       └── MyTask.kt
    │   └── resources/
    │       └── META-INF/
    │           └── gradle-plugins/
    │               └── com.example.my-plugin.properties
    └── test/
        └── kotlin/
            └── com/example/   # Your test code
                └── MyPluginTest.kt

```

## Flow of Gradle Plugin

The Gradle plugin architecture involves several key components that work together:

### Plugin Class

The Plugin class is the entry point for your plugin's functionality. It must implement the `Plugin<Project>` interface from the `org.gradle.api` package and override the `apply(project: Project)` method.

```kotlin
package com.example

import org.gradle.api.Plugin
import org.gradle.api.Project

class MyPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        // Register tasks, extensions, or other configurations
        project.tasks.register("myTask", MyTask::class.java) {
            it.group = "custom"  // Optional: Task group for organization
            it.description = "Performs custom build logic"  // Optional: Description
        }
    }
}

```

### Task Implementation

Tasks represent the actual work performed by your plugin. They typically extend `DefaultTask` and include methods annotated with `@TaskAction`.

```kotlin
package com.example

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction

open class MyTask : DefaultTask() {
    @TaskAction
    fun run() {
        logger.lifecycle("MyTask is executing!")
        // Your task implementation goes here
    }
}

```

The `@TaskAction` annotation tells Gradle which method to invoke when the task is executed.

## Configuring the Source Project to Publish as Plugin

To prepare your project for publishing as a plugin, you need to apply specific plugins and configurations in your `build.gradle.kts` file:

```kotlin
plugins {
    kotlin("jvm") version "1.9.10"  // Use appropriate version
    `java-gradle-plugin`
    `maven-publish`
}

group = "com.example"    // Your group ID (typically reverse domain)
version = "1.0.0"        // Your plugin version

repositories {
    mavenCentral()
}

dependencies {
    // Gradle API for plugin development
    implementation(gradleApi())
    implementation(kotlin("stdlib-jdk8"))

    // Testing dependencies
    testImplementation("org.junit.jupiter:junit-jupiter:5.9.2")
    testImplementation(gradleTestKit())
}

tasks.withType<Test> {
    useJUnitPlatform()
}

```

The `java-gradle-plugin` plugin automatically configures your project for plugin development, while the `maven-publish` plugin enables publishing capabilities.

## Customizing the Plugin

### Maven Publishing

Configure the `maven-publish` plugin to customize artifact generation:

```kotlin
publishing {
    publications {
        create<MavenPublication>("maven") {
            groupId = "com.example"
            artifactId = "my-gradle-plugin"
            version = "1.0.0"
            from(components["java"])

            // Optional: add additional metadata
            pom {
                name.set("My Gradle Plugin")
                description.set("A custom Gradle plugin for standardizing builds")
                url.set("https://github.com/example/my-gradle-plugin")

                licenses {
                    license {
                        name.set("MIT License")
                        url.set("https://opensource.org/licenses/MIT")
                    }
                }

                developers {
                    developer {
                        id.set("developer-id")
                        name.set("Developer Name")
                        email.set("dev@example.com")
                    }
                }
            }
        }
    }

    // Optional: configure repositories for publishing
    repositories {
        maven {
            name = "myRepo"
            url = uri("https://repo.example.com/releases")
            credentials {
                username = project.findProperty("repoUsername") as String? ?: ""
                password = project.findProperty("repoPassword") as String? ?: ""
            }
        }
    }
}

```

### Gradle Plugin Portal Publishing

To publish to the Gradle Plugin Portal, you need to apply the `com.gradle.plugin-publish` plugin:

```kotlin
plugins {
    kotlin("jvm") version "1.9.10"
    `java-gradle-plugin`
    id("com.gradle.plugin-publish") version "1.2.1"
}

pluginBundle {
    website = "https://example.com/my-plugin"
    vcsUrl = "https://github.com/example/my-gradle-plugin"
    tags = listOf("build", "custom", "example")
}

gradlePlugin {
    plugins {
        create("myPlugin") {
            id = "com.example.my-plugin"
            displayName = "My Gradle Plugin"
            description = "A custom Gradle plugin for standardizing builds"
            implementationClass = "com.example.MyPlugin"
        }
    }
}

```

The `gradlePlugin` block configures metadata for your plugin, including the important plugin ID which follows reverse domain naming conventions.

### Plugin Descriptor File

For your plugin to be discoverable when using the plugin ID, you need to create a properties file:

1. Create a file at: `src/main/resources/META-INF/gradle-plugins/com.example.my-plugin.properties`
2. Add this content:

```
implementation-class=com.example.MyPlugin

```

This file maps your plugin ID to the implementing class.

### Creating Configurable Plugins with Extensions

Extensions allow users to configure your plugin using a DSL-like syntax:

```kotlin
// Define an extension class
open class MyPluginExtension {
    var enabled: Boolean = true
    var message: String = "Default message"
}

// In your plugin class
class MyPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        // Create the extension
        val extension = project.extensions.create("myPlugin", MyPluginExtension::class.java)

        // Register task that uses the extension
        project.tasks.register("myTask", MyTask::class.java) {
            it.group = "custom"
            it.description = "Performs custom build logic"

            // Configure the task based on the extension
            it.enabled = extension.enabled
            it.message = extension.message
        }
    }
}

// Update your task to accept configuration
open class MyTask : DefaultTask() {
    @get:Input
    var enabled: Boolean = true

    @get:Input
    var message: String = "Default message"

    @TaskAction
    fun run() {
        if (enabled) {
            logger.lifecycle("Message: $message")
        }
    }
}

```

This allows users to configure your plugin in their `build.gradle.kts`:

```kotlin
myPlugin {
    enabled = true
    message = "Hello from my plugin!"
}

```

## Testing Your Plugin

Testing your plugin is crucial. The Gradle TestKit provides utilities specifically for testing plugins:

```kotlin
package com.example

import org.gradle.testkit.runner.GradleRunner
import org.gradle.testkit.runner.TaskOutcome
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.io.TempDir
import java.io.File
import kotlin.test.assertEquals

class MyPluginTest {
    @TempDir
    lateinit var testProjectDir: File
    private lateinit var buildFile: File

    @BeforeEach
    fun setup() {
        buildFile = File(testProjectDir, "build.gradle.kts")
        buildFile.writeText("""
            plugins {
                id("com.example.my-plugin")
            }

            myPlugin {
                message = "Test message"
            }
        """.trimIndent())
    }

    @Test
    fun `should execute myTask successfully`() {
        // Run the build with the task
        val result = GradleRunner.create()
            .withProjectDir(testProjectDir)
            .withPluginClasspath()
            .withArguments("myTask")
            .build()

        // Verify the task executed successfully
        assertEquals(TaskOutcome.SUCCESS, result.task(":myTask")?.outcome)
        // Verify output contains our message
        assert(result.output.contains("Message: Test message"))
    }
}

```

## Verifying the Published Plugin

### Publishing Locally

To test your plugin before publishing it to a remote repository, publish it to your local Maven repository:

```bash
./gradlew publishToMavenLocal

```

This publishes your plugin to:

- **Linux/macOS**: `~/.m2/repository`
- **Windows**: `C:\Users\{YourUsername}\.m2\repository`

### Using the Published Plugin

To use your locally published plugin in another project, configure that project's `settings.gradle.kts`:

```kotlin
pluginManagement {
    repositories {
        mavenLocal() // Add this to use locally published plugins
        gradlePluginPortal()
        mavenCentral()
    }
}

```

Then in your `build.gradle.kts`:

```kotlin
plugins {
    id("com.example.my-plugin") version "1.0.0"
}

// If your plugin has extensions, configure them:
myPlugin {
    message = "Hello from the consumer project!"
}

```

Run a task from your plugin to verify it works:

```bash
./gradlew myTask

```

## Troubleshooting Common Issues

### Plugin Not Found

If your plugin cannot be found:

- Verify the plugin ID matches between the properties file and the `gradlePlugin` block
- Check that the plugin has been published with `./gradlew publishToMavenLocal`
- Ensure `mavenLocal()` is included in the repositories list
- Verify the plugin version matches the published version

### Task Not Registered

If your task is not available:

- Check that the plugin is properly applied in the build script
- Verify the task registration code in your plugin's `apply` method

### Configuration Errors

If your plugin extension isn't working:

- Ensure property names match between the extension class and the consumer project
- Verify that `project.extensions.create()` is called before tasks are registered

### Debugging

Add logging to your plugin to help diagnose issues:

```kotlin
override fun apply(project: Project) {
    project.logger.lifecycle("Applying MyPlugin to project ${project.name}")
    // Rest of your plugin code
}

```

## Conclusion

Creating a Gradle plugin is a powerful way to share build logic across projects. By packaging common functionality into a plugin, you can ensure consistency, reduce duplication, and improve maintainability across your projects. With proper testing and documentation, your plugin can be a valuable addition to your organization's toolset or even the wider Gradle community.

Remember that well-designed plugins should:

- Have a clear purpose
- Be configurable but provide sensible defaults
- Include comprehensive tests
- Have clear documentation
- Follow Gradle best practices

By following this guide, you should now have a solid foundation for creating, customizing, testing, and publishing your own Gradle plugins.