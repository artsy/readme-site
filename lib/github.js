function dirsAndFiles(data) {
  let dirs = [];
  let files = [];
  data.forEach(obj => {
    if (obj.type === 'dir' && obj.name.charAt(0) !== '.') {
      dirs.push(obj)
    } else if (obj.type === 'file' && obj.name.includes('.md')) {
      files.push({
        slug: obj.name.slice(0, obj.name.indexOf('.md')),
        url: obj.download_url,
        sha: obj.sha,
      })
    }
  });
  return Promise.resolve({'dirs': dirs, 'files': files});
}

async function get(path) {
  const res = await fetch(process.env.GITHUB_URL + path,
  {
    headers: {'Authorization': `token ${process.env.GITHUB_TOKEN}`}
  });
  return res.json();
}

export async function getContents(path, output = {}) {
  path = !path || path === '/' ? '/contents' : '/contents' + path;
  const data = await get(path).then(data => dirsAndFiles(data));
  output['files'] = data.files;
  output['dirs'] = {};
  if (data.dirs.length === 0) {
    return Promise.resolve(output)
  } else {
    await Promise.all(data.dirs.map(async obj => {
      output['dirs'][obj.name] = await getContents(`/${obj.path}`);
    }))
    return Promise.resolve(output);
  }
}
