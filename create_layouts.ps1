$parentDirs = @('about', 'academic', 'administration')
foreach ($p in $parentDirs) {
    $parentPath = Join-Path $PWD.Path "src\app\[locale]\$p"
    $parentName = (Get-Culture).TextInfo.ToTitleCase($p.ToLower())
    
    $subDirs = Get-ChildItem -LiteralPath $parentPath -Directory
    foreach ($dir in $subDirs) {
        $pagePath = Join-Path $dir.FullName "page.tsx"
        if (Test-Path -LiteralPath $pagePath) {
            $layoutPath = Join-Path $dir.FullName "layout.tsx"
            $dirName = $dir.Name.Replace('-', ' ')
            $dirName = (Get-Culture).TextInfo.ToTitleCase($dirName.ToLower())
            $title = "$dirName - $parentName"
            $content = "import type { Metadata } from 'next';`n`nexport const metadata: Metadata = {`n  title: '$title',`n};`n`nexport default function Layout({ children }: { children: React.ReactNode }) {`n  return <>{children}</>;`n}"
            Set-Content -LiteralPath $layoutPath -Value $content
        }
    }
}

$parentPathAdmin = Join-Path $PWD.Path "src\app\[locale]\administration"
if (!(Test-Path -LiteralPath (Join-Path $parentPathAdmin "layout.tsx"))) {
    $content = "import type { Metadata } from 'next';`n`nexport const metadata: Metadata = {`n  title: 'Administration',`n};`n`nexport default function Layout({ children }: { children: React.ReactNode }) {`n  return <>{children}</>;`n}"
    Set-Content -LiteralPath (Join-Path $parentPathAdmin "layout.tsx") -Value $content
}
