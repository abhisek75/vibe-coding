import React from "react";
import { TreeItem } from "@/types";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarProvider,
    SidebarRail,
} from "@/components/ui/sidebar";
import { 
    ChevronRightIcon, 
    FileIcon, 
    FolderIcon,
    FileTextIcon,
    CodeIcon,
    DatabaseIcon,
    ImageIcon,
    SettingsIcon,
    PackageIcon,
    TerminalIcon
} from "lucide-react";

interface TreeViewProps {
    data: TreeItem[];
    value?: string | null;
    onSelect?: (value: string) => void;
}

// Language-specific file icons mapping
const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    const iconMap: Record<string, React.ComponentType> = {
        // JavaScript/TypeScript
        'js': CodeIcon,
        'jsx': CodeIcon,
        'ts': CodeIcon,
        'tsx': CodeIcon,
        'mjs': CodeIcon,
        'cjs': CodeIcon,
        
        // Python
        'py': CodeIcon,
        'pyx': CodeIcon,
        'pyi': CodeIcon,
        'pyc': CodeIcon,
        
        // Java/Kotlin/Scala
        'java': CodeIcon,
        'class': CodeIcon,
        'jar': PackageIcon,
        'kt': CodeIcon,
        'kts': CodeIcon,
        'scala': CodeIcon,
        
        // C/C++
        'c': CodeIcon,
        'cpp': CodeIcon,
        'cc': CodeIcon,
        'cxx': CodeIcon,
        'h': CodeIcon,
        'hpp': CodeIcon,
        'hxx': CodeIcon,
        
        // C#/.NET
        'cs': CodeIcon,
        'vb': CodeIcon,
        'fs': CodeIcon,
        'dll': PackageIcon,
        'exe': TerminalIcon,
        
        // Web Technologies
        'html': CodeIcon,
        'htm': CodeIcon,
        'css': CodeIcon,
        'scss': CodeIcon,
        'sass': CodeIcon,
        'less': CodeIcon,
        'vue': CodeIcon,
        'svelte': CodeIcon,
        
        // PHP
        'php': CodeIcon,
        'phtml': CodeIcon,
        'php3': CodeIcon,
        'php4': CodeIcon,
        'php5': CodeIcon,
        
        // Ruby
        'rb': CodeIcon,
        'rake': CodeIcon,
        'gemspec': CodeIcon,
        
        // Go
        'go': CodeIcon,
        'mod': SettingsIcon,
        'sum': SettingsIcon,
        
        // Rust
        'rs': CodeIcon,
        'toml': SettingsIcon,
        
        // Swift/Objective-C
        'swift': CodeIcon,
        'm': CodeIcon,
        'mm': CodeIcon,
        
        // Shell/Scripts
        'sh': TerminalIcon,
        'bash': TerminalIcon,
        'zsh': TerminalIcon,
        'fish': TerminalIcon,
        'ps1': TerminalIcon,
        'bat': TerminalIcon,
        'cmd': TerminalIcon,
        
        // Database
        'sql': DatabaseIcon,
        'db': DatabaseIcon,
        'sqlite': DatabaseIcon,
        'mdb': DatabaseIcon,
        
        // Configuration
        'json': SettingsIcon,
        'xml': SettingsIcon,
        'yaml': SettingsIcon,
        'yml': SettingsIcon,
        'ini': SettingsIcon,
        'conf': SettingsIcon,
        'config': SettingsIcon,
        'env': SettingsIcon,
        'properties': SettingsIcon,
        
        // Documentation
        'md': FileTextIcon,
        'markdown': FileTextIcon,
        'txt': FileTextIcon,
        'rst': FileTextIcon,
        'adoc': FileTextIcon,
        'asciidoc': FileTextIcon,
        
        // Images
        'png': ImageIcon,
        'jpg': ImageIcon,
        'jpeg': ImageIcon,
        'gif': ImageIcon,
        'svg': ImageIcon,
        'webp': ImageIcon,
        'ico': ImageIcon,
        'bmp': ImageIcon,
        
        // Package files
        'zip': PackageIcon,
        'tar': PackageIcon,
        'gz': PackageIcon,
        'rar': PackageIcon,
        '7z': PackageIcon,
        'deb': PackageIcon,
        'rpm': PackageIcon,
        
        // Language-specific package files
        'package': SettingsIcon, // package.json
        'lock': SettingsIcon, // package-lock.json, yarn.lock
        'requirements': SettingsIcon, // requirements.txt
        'pipfile': SettingsIcon,
        'gemfile': SettingsIcon,
        'podfile': SettingsIcon,
        'cargo': SettingsIcon, // Cargo.toml
        'pom': SettingsIcon, // pom.xml
        'gradle': SettingsIcon,
        'sbt': SettingsIcon,
        
        // Other common files
        'dockerfile': TerminalIcon,
        'makefile': TerminalIcon,
        'cmake': SettingsIcon,
        'gitignore': SettingsIcon,
        'gitattributes': SettingsIcon,
        'editorconfig': SettingsIcon,
        'eslintrc': SettingsIcon,
        'prettierrc': SettingsIcon,
        'babelrc': SettingsIcon,
        'webpack': SettingsIcon,
        'vite': SettingsIcon,
        'rollup': SettingsIcon,
    };
    
    // Special handling for specific filenames
    const specialFiles: Record<string, React.ComponentType> = {
        'package.json': SettingsIcon,
        'package-lock.json': SettingsIcon,
        'yarn.lock': SettingsIcon,
        'requirements.txt': SettingsIcon,
        'Pipfile': SettingsIcon,
        'Pipfile.lock': SettingsIcon,
        'Gemfile': SettingsIcon,
        'Gemfile.lock': SettingsIcon,
        'Podfile': SettingsIcon,
        'Podfile.lock': SettingsIcon,
        'Cargo.toml': SettingsIcon,
        'Cargo.lock': SettingsIcon,
        'pom.xml': SettingsIcon,
        'build.gradle': SettingsIcon,
        'build.sbt': SettingsIcon,
        'CMakeLists.txt': SettingsIcon,
        'Makefile': TerminalIcon,
        'Dockerfile': TerminalIcon,
        '.gitignore': SettingsIcon,
        '.gitattributes': SettingsIcon,
        '.editorconfig': SettingsIcon,
        '.eslintrc': SettingsIcon,
        '.prettierrc': SettingsIcon,
        '.babelrc': SettingsIcon,
        'webpack.config.js': SettingsIcon,
        'vite.config.js': SettingsIcon,
        'rollup.config.js': SettingsIcon,
        'tsconfig.json': SettingsIcon,
        'jsconfig.json': SettingsIcon,
        'composer.json': SettingsIcon,
        'composer.lock': SettingsIcon,
        'go.mod': SettingsIcon,
        'go.sum': SettingsIcon,
        'README.md': FileTextIcon,
        'README.txt': FileTextIcon,
        'LICENSE': FileTextIcon,
        'CHANGELOG.md': FileTextIcon,
        'CONTRIBUTING.md': FileTextIcon,
    };
    
    // Check for special filenames first
    const lowerFileName = fileName.toLowerCase();
    if (specialFiles[fileName] || specialFiles[lowerFileName]) {
        return specialFiles[fileName] || specialFiles[lowerFileName];
    }
    
    // Then check by extension
    if (extension && iconMap[extension]) {
        return iconMap[extension];
    }
    
    // Default to generic file icon
    return FileIcon;
};

export const TreeView = ({
    data,
    value,
    onSelect,
}: TreeViewProps) => {
    return (
        <SidebarProvider>
            <Sidebar collapsible="none" className="w-full">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {data.map((item, index) => (
                                    <Tree
                                        key={index}
                                        item={item}
                                        selectedValue={value}
                                        onSelect={onSelect}
                                        parentPath=""
                                    />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
        </SidebarProvider>
    );
};

interface TreeProps {
    item: TreeItem;
    selectedValue?: string | null;
    onSelect?: (value: string) => void;
    parentPath: string;
}

const Tree = ({ item, selectedValue, onSelect, parentPath }: TreeProps) => {
    const [name, ...items] = Array.isArray(item) ? item : [item];
    const currentPath = parentPath ? `${parentPath}/${name}` : name;

    if (!items.length) {
        // It's a file
        const isSelected = selectedValue === currentPath;
        const FileIconComponent = getFileIcon(name);

        return (
            <SidebarMenuButton
                isActive={isSelected}
                className="data-[active=true]:bg-transparent"
                onClick={() => onSelect?.(currentPath)}
            >
                <FileIconComponent className="h-4 w-4" />
                <span className="truncate">
                    {name}
                </span>
            </SidebarMenuButton>
        );
    }

    // It's a folder
    return (
        <SidebarMenuItem>
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                defaultOpen
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <ChevronRightIcon className="transition-transform" />
                        <FolderIcon />
                        <span className="truncate">
                            {name}
                        </span>
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items.map((subItem, index) => (
                            <Tree
                                key={index}
                                item={subItem}
                                selectedValue={selectedValue}
                                onSelect={onSelect}
                                parentPath={currentPath}
                            />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
};

// Example usage with multi-language project structure
export const ExampleMultiLanguageTree = () => {
    const multiLanguageData: TreeItem[] = [
        [
            "frontend",
            [
                "src",
                [
                    "components",
                    "Header.tsx",
                    "Footer.jsx",
                    "Navigation.vue"
                ],
                [
                    "styles",
                    "main.css",
                    "theme.scss",
                    "variables.less"
                ],
                [
                    "utils",
                    "helpers.js",
                    "api.ts",
                    "constants.js"
                ],
                "App.tsx",
                "index.html"
            ],
            "package.json",
            "package-lock.json",
            "tsconfig.json",
            "vite.config.js",
            ".eslintrc.json",
            ".prettierrc",
            "README.md"
        ],
        [
            "backend",
            [
                "src",
                [
                    "controllers",
                    "UserController.java",
                    "ProductController.py",
                    "OrderController.cs"
                ],
                [
                    "models",
                    "User.java",
                    "Product.py",
                    "Order.cs"
                ],
                [
                    "services",
                    "UserService.java",
                    "EmailService.py",
                    "PaymentService.cs"
                ],
                [
                    "config",
                    "database.py",
                    "application.properties",
                    "appsettings.json"
                ]
            ],
            "requirements.txt",
            "pom.xml",
            "Dockerfile",
            "docker-compose.yml"
        ],
        [
            "mobile",
            [
                "ios",
                [
                    "App",
                    "AppDelegate.swift",
                    "ViewController.swift",
                    "Main.storyboard"
                ],
                "Info.plist",
                "Podfile"
            ],
            [
                "android",
                [
                    "app",
                    [
                        "src",
                        [
                            "main",
                            [
                                "java",
                                "MainActivity.java",
                                "UserAdapter.kt"
                            ],
                            "AndroidManifest.xml"
                        ]
                    ],
                    "build.gradle"
                ],
                "gradle.properties"
            ],
            [
                "shared",
                "ApiClient.dart",
                "Models.swift",
                "Utils.kt"
            ]
        ],
        [
            "scripts",
            "deploy.sh",
            "migrate.py",
            "build.ps1",
            "test.rb",
            "backup.sql"
        ],
        [
            "docs",
            "API.md",
            "CONTRIBUTING.md",
            "CHANGELOG.md",
            [
                "images",
                "architecture.png",
                "logo.svg",
                "screenshot.jpg"
            ]
        ],
        [
            "database",
            [
                "migrations",
                "001_create_users.sql",
                "002_create_products.sql",
                "003_add_indexes.sql"
            ],
            [
                "seeds",
                "users.sql",
                "products.sql"
            ],
            "schema.sql"
        ],
        [
            "infrastructure",
            [
                "terraform",
                "main.tf",
                "variables.tf",
                "outputs.tf"
            ],
            [
                "kubernetes",
                "deployment.yaml",
                "service.yaml",
                "configmap.yaml"
            ],
            [
                "ansible",
                "playbook.yml",
                "inventory.ini"
            ]
        ],
        ".gitignore",
        ".gitattributes",
        ".editorconfig",
        "LICENSE",
        "README.md"
    ];

    const [selectedFile, setSelectedFile] = React.useState<string | null>(null);

    return (
        <div className="w-full h-screen">
            <TreeView
                data={multiLanguageData}
                value={selectedFile}
                onSelect={setSelectedFile}
            />
            {selectedFile && (
                <div className="fixed bottom-4 right-4 p-4 bg-background border rounded-lg shadow-lg">
                    <p className="text-sm text-muted-foreground">Selected:</p>
                    <p className="font-mono text-sm">{selectedFile}</p>
                </div>
            )}
        </div>
    );
};

// Sample data for different language ecosystems
export const sampleProjectStructures = {
    // React/Next.js Project
    react: [
        [
            "src",
            [
                "components",
                [
                    "ui",
                    "Button.tsx",
                    "Input.tsx",
                    "Dialog.tsx"
                ],
                "Header.tsx",
                "Footer.tsx",
                "Layout.tsx"
            ],
            [
                "pages",
                "index.tsx",
                "about.tsx",
                "_app.tsx",
                "_document.tsx"
            ],
            [
                "hooks",
                "useAuth.ts",
                "useApi.ts"
            ],
            [
                "utils",
                "api.ts",
                "helpers.ts"
            ],
            [
                "styles",
                "globals.css",
                "components.css"
            ]
        ],
        "package.json",
        "tsconfig.json",
        "next.config.js",
        "tailwind.config.js",
        ".eslintrc.json"
    ] as TreeItem[],

    // Python Django Project
    python: [
        [
            "myproject",
            [
                "apps",
                [
                    "users",
                    "__init__.py",
                    "models.py",
                    "views.py",
                    "urls.py",
                    "admin.py"
                ],
                [
                    "products",
                    "__init__.py",
                    "models.py",
                    "views.py",
                    "serializers.py"
                ]
            ],
            [
                "settings",
                "__init__.py",
                "base.py",
                "development.py",
                "production.py"
            ],
            "urls.py",
            "wsgi.py",
            "asgi.py"
        ],
        [
            "static",
            [
                "css",
                "style.css"
            ],
            [
                "js",
                "main.js"
            ]
        ],
        [
            "templates",
            "base.html",
            "index.html"
        ],
        "requirements.txt",
        "manage.py",
        "Dockerfile",
        ".env.example"
    ] as TreeItem[],

    // Java Spring Boot Project
    java: [
        [
            "src",
            [
                "main",
                [
                    "java",
                    [
                        "com",
                        [
                            "example",
                            [
                                "demo",
                                "DemoApplication.java",
                                [
                                    "controller",
                                    "UserController.java",
                                    "ProductController.java"
                                ],
                                [
                                    "service",
                                    "UserService.java",
                                    "ProductService.java"
                                ],
                                [
                                    "repository",
                                    "UserRepository.java",
                                    "ProductRepository.java"
                                ],
                                [
                                    "model",
                                    "User.java",
                                    "Product.java"
                                ]
                            ]
                        ]
                    ]
                ],
                [
                    "resources",
                    "application.properties",
                    "application-dev.properties",
                    [
                        "static",
                        "style.css"
                    ],
                    [
                        "templates",
                        "index.html"
                    ]
                ]
            ],
            [
                "test",
                [
                    "java",
                    [
                        "com",
                        [
                            "example",
                            [
                                "demo",
                                "DemoApplicationTests.java",
                                "UserControllerTest.java"
                            ]
                        ]
                    ]
                ]
            ]
        ],
        "pom.xml",
        "mvnw",
        "mvnw.cmd",
        ".gitignore"
    ] as TreeItem[],

    // Node.js Express Project
    nodejs: [
        [
            "src",
            [
                "controllers",
                "userController.js",
                "productController.js"
            ],
            [
                "models",
                "User.js",
                "Product.js"
            ],
            [
                "routes",
                "users.js",
                "products.js",
                "index.js"
            ],
            [
                "middleware",
                "auth.js",
                "validation.js",
                "errorHandler.js"
            ],
            [
                "config",
                "database.js",
                "config.js"
            ],
            [
                "utils",
                "helpers.js",
                "logger.js"
            ],
            "app.js",
            "server.js"
        ],
        [
            "tests",
            "user.test.js",
            "product.test.js"
        ],
        "package.json",
        "package-lock.json",
        ".env.example",
        ".gitignore",
        "README.md"
    ] as TreeItem[],

    // Go Project
    go: [
        [
            "cmd",
            [
                "api",
                "main.go"
            ]
        ],
        [
            "internal",
            [
                "handlers",
                "user.go",
                "product.go"
            ],
            [
                "models",
                "user.go",
                "product.go"
            ],
            [
                "services",
                "user_service.go",
                "product_service.go"
            ],
            [
                "database",
                "connection.go",
                "migrations.go"
            ]
        ],
        [
            "pkg",
            [
                "utils",
                "helpers.go",
                "validator.go"
            ]
        ],
        [
            "configs",
            "config.go",
            "database.go"
        ],
        "go.mod",
        "go.sum",
        "Dockerfile",
        "README.md"
    ] as TreeItem[],

    // Rust Project
    rust: [
        [
            "src",
            "main.rs",
            "lib.rs",
            [
                "models",
                "mod.rs",
                "user.rs",
                "product.rs"
            ],
            [
                "handlers",
                "mod.rs",
                "user_handler.rs",
                "product_handler.rs"
            ],
            [
                "utils",
                "mod.rs",
                "helpers.rs"
            ]
        ],
        [
            "tests",
            "integration_test.rs",
            "unit_test.rs"
        ],
        "Cargo.toml",
        "Cargo.lock",
        "README.md"
    ] as TreeItem[]
};

export default TreeView;