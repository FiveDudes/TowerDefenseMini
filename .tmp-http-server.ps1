param([string]$Root,[int]$Port)
Add-Type -AssemblyName System.Web
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()
while ($listener.IsListening) {
  $context = $listener.GetContext()
  try {
    $path = $context.Request.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($path)) { $path = 'index.html' }
    $full = Join-Path $Root $path
    if (!(Test-Path $full -PathType Leaf)) {
      $context.Response.StatusCode = 404
      $bytes = [System.Text.Encoding]::UTF8.GetBytes('Not found')
      $context.Response.OutputStream.Write($bytes,0,$bytes.Length)
      $context.Response.Close()
      continue
    }
    $ext = [System.IO.Path]::GetExtension($full).ToLowerInvariant()
    $type = switch ($ext) {
      '.html' { 'text/html; charset=utf-8' }
      '.js' { 'application/javascript; charset=utf-8' }
      '.css' { 'text/css; charset=utf-8' }
      default { 'application/octet-stream' }
    }
    $bytes = [System.IO.File]::ReadAllBytes($full)
    $context.Response.ContentType = $type
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes,0,$bytes.Length)
    $context.Response.Close()
  } catch {
    try { $context.Response.StatusCode = 500; $context.Response.Close() } catch {}
  }
}
