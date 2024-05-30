console = console || {
  log: (...args) => print(Array.prototype.slice.call(args).join(" ")),
};
class TextEncoder {
  // UTF-8 문자열을 바이너리 데이터로 인코딩하는 함수
  encode(str) {
    const utf8 = unescape(encodeURIComponent(str)); // UTF-8로 변환
    const bytes = new Uint8Array(utf8.length); // 바이너리 데이터를 담을 배열 생성
    for (let i = 0; i < utf8.length; i++) {
      bytes[i] = utf8.charCodeAt(i); // 각 문자를 바이너리로 변환하여 배열에 저장
    }
    return bytes;
  }
}
class TextDecoder {
  // 바이너리 데이터를 UTF-8 문자열로 디코딩하는 함수
  decode(bytes) {
    let result = "";
    let i = 0;

    while (i < bytes.byteLength) {
      let byte1 = bytes[i++];
      let byte2, byte3, byte4;
      let codePoint = 0;

      if ((byte1 & 0x80) === 0) {
        // 1 바이트 문자
        codePoint = byte1;
      } else if ((byte1 & 0xe0) === 0xc0) {
        // 2 바이트 문자
        byte2 = bytes[i++] & 0x3f;
        codePoint = ((byte1 & 0x1f) << 6) | byte2;
      } else if ((byte1 & 0xf0) === 0xe0) {
        // 3 바이트 문자
        byte2 = bytes[i++] & 0x3f;
        byte3 = bytes[i++] & 0x3f;
        codePoint = ((byte1 & 0x0f) << 12) | (byte2 << 6) | byte3;
      } else if ((byte1 & 0xf8) === 0xf0) {
        // 4 바이트 문자
        byte2 = bytes[i++] & 0x3f;
        byte3 = bytes[i++] & 0x3f;
        byte4 = bytes[i++] & 0x3f;
        codePoint =
          ((byte1 & 0x07) << 18) | (byte2 << 12) | (byte3 << 6) | byte4;
      }

      result += String.fromCodePoint(codePoint);
    }

    return result;
  }
}

const FD_STDIN = 0;
const FD_STDOUT = 1;
const FD_STDERR = 2;
const CLOCKID_REALTIME = 0;
const CLOCKID_MONOTONIC = 1;
const CLOCKID_PROCESS_CPUTIME_ID = 2;
const CLOCKID_THREAD_CPUTIME_ID = 3;
const ERRNO_SUCCESS = 0;
const ERRNO_2BIG = 1;
const ERRNO_ACCES = 2;
const ERRNO_ADDRINUSE = 3;
const ERRNO_ADDRNOTAVAIL = 4;
const ERRNO_AFNOSUPPORT = 5;
const ERRNO_AGAIN = 6;
const ERRNO_ALREADY = 7;
const ERRNO_BADF = 8;
const ERRNO_BADMSG = 9;
const ERRNO_BUSY = 10;
const ERRNO_CANCELED = 11;
const ERRNO_CHILD = 12;
const ERRNO_CONNABORTED = 13;
const ERRNO_CONNREFUSED = 14;
const ERRNO_CONNRESET = 15;
const ERRNO_DEADLK = 16;
const ERRNO_DESTADDRREQ = 17;
const ERRNO_DOM = 18;
const ERRNO_DQUOT = 19;
const ERRNO_EXIST = 20;
const ERRNO_FAULT = 21;
const ERRNO_FBIG = 22;
const ERRNO_HOSTUNREACH = 23;
const ERRNO_IDRM = 24;
const ERRNO_ILSEQ = 25;
const ERRNO_INPROGRESS = 26;
const ERRNO_INTR = 27;
const ERRNO_INVAL = 28;
const ERRNO_IO = 29;
const ERRNO_ISCONN = 30;
const ERRNO_ISDIR = 31;
const ERRNO_LOOP = 32;
const ERRNO_MFILE = 33;
const ERRNO_MLINK = 34;
const ERRNO_MSGSIZE = 35;
const ERRNO_MULTIHOP = 36;
const ERRNO_NAMETOOLONG = 37;
const ERRNO_NETDOWN = 38;
const ERRNO_NETRESET = 39;
const ERRNO_NETUNREACH = 40;
const ERRNO_NFILE = 41;
const ERRNO_NOBUFS = 42;
const ERRNO_NODEV = 43;
const ERRNO_NOENT = 44;
const ERRNO_NOEXEC = 45;
const ERRNO_NOLCK = 46;
const ERRNO_NOLINK = 47;
const ERRNO_NOMEM = 48;
const ERRNO_NOMSG = 49;
const ERRNO_NOPROTOOPT = 50;
const ERRNO_NOSPC = 51;
const ERRNO_NOSYS = 52;
const ERRNO_NOTCONN = 53;
const ERRNO_NOTDIR = 54;
const ERRNO_NOTEMPTY = 55;
const ERRNO_NOTRECOVERABLE = 56;
const ERRNO_NOTSOCK = 57;
const ERRNO_NOTSUP = 58;
const ERRNO_NOTTY = 59;
const ERRNO_NXIO = 60;
const ERRNO_OVERFLOW = 61;
const ERRNO_OWNERDEAD = 62;
const ERRNO_PERM = 63;
const ERRNO_PIPE = 64;
const ERRNO_PROTO = 65;
const ERRNO_PROTONOSUPPORT = 66;
const ERRNO_PROTOTYPE = 67;
const ERRNO_RANGE = 68;
const ERRNO_ROFS = 69;
const ERRNO_SPIPE = 70;
const ERRNO_SRCH = 71;
const ERRNO_STALE = 72;
const ERRNO_TIMEDOUT = 73;
const ERRNO_TXTBSY = 74;
const ERRNO_XDEV = 75;
const ERRNO_NOTCAPABLE = 76;
const RIGHTS_FD_DATASYNC = 1 << 0;
const RIGHTS_FD_READ = 1 << 1;
const RIGHTS_FD_SEEK = 1 << 2;
const RIGHTS_FD_FDSTAT_SET_FLAGS = 1 << 3;
const RIGHTS_FD_SYNC = 1 << 4;
const RIGHTS_FD_TELL = 1 << 5;
const RIGHTS_FD_WRITE = 1 << 6;
const RIGHTS_FD_ADVISE = 1 << 7;
const RIGHTS_FD_ALLOCATE = 1 << 8;
const RIGHTS_PATH_CREATE_DIRECTORY = 1 << 9;
const RIGHTS_PATH_CREATE_FILE = 1 << 10;
const RIGHTS_PATH_LINK_SOURCE = 1 << 11;
const RIGHTS_PATH_LINK_TARGET = 1 << 12;
const RIGHTS_PATH_OPEN = 1 << 13;
const RIGHTS_FD_READDIR = 1 << 14;
const RIGHTS_PATH_READLINK = 1 << 15;
const RIGHTS_PATH_RENAME_SOURCE = 1 << 16;
const RIGHTS_PATH_RENAME_TARGET = 1 << 17;
const RIGHTS_PATH_FILESTAT_GET = 1 << 18;
const RIGHTS_PATH_FILESTAT_SET_SIZE = 1 << 19;
const RIGHTS_PATH_FILESTAT_SET_TIMES = 1 << 20;
const RIGHTS_FD_FILESTAT_GET = 1 << 21;
const RIGHTS_FD_FILESTAT_SET_SIZE = 1 << 22;
const RIGHTS_FD_FILESTAT_SET_TIMES = 1 << 23;
const RIGHTS_PATH_SYMLINK = 1 << 24;
const RIGHTS_PATH_REMOVE_DIRECTORY = 1 << 25;
const RIGHTS_PATH_UNLINK_FILE = 1 << 26;
const RIGHTS_POLL_FD_READWRITE = 1 << 27;
const RIGHTS_SOCK_SHUTDOWN = 1 << 28;
class Iovec {
  static read_bytes(view, ptr) {
    const iovec = new Iovec();
    iovec.buf = view.getUint32(ptr, true);
    iovec.buf_len = view.getUint32(ptr + 4, true);
    return iovec;
  }
  static read_bytes_array(view, ptr, len) {
    const iovecs = [];
    for (let i = 0; i < len; i++) {
      iovecs.push(Iovec.read_bytes(view, ptr + 8 * i));
    }
    return iovecs;
  }
}
class Ciovec {
  static read_bytes(view, ptr) {
    const iovec = new Ciovec();
    iovec.buf = view.getUint32(ptr, true);
    iovec.buf_len = view.getUint32(ptr + 4, true);
    return iovec;
  }
  static read_bytes_array(view, ptr, len) {
    const iovecs = [];
    for (let i = 0; i < len; i++) {
      iovecs.push(Ciovec.read_bytes(view, ptr + 8 * i));
    }
    return iovecs;
  }
}
const WHENCE_SET = 0;
const WHENCE_CUR = 1;
const WHENCE_END = 2;
const FILETYPE_UNKNOWN = 0;
const FILETYPE_BLOCK_DEVICE = 1;
const FILETYPE_CHARACTER_DEVICE = 2;
const FILETYPE_DIRECTORY = 3;
const FILETYPE_REGULAR_FILE = 4;
const FILETYPE_SOCKET_DGRAM = 5;
const FILETYPE_SOCKET_STREAM = 6;
const FILETYPE_SYMBOLIC_LINK = 7;
class Dirent {
  head_length() {
    return 24;
  }
  name_length() {
    return this.dir_name.byteLength;
  }
  write_head_bytes(view, ptr) {
    view.setBigUint64(ptr, this.d_next, true);
    view.setBigUint64(ptr + 8, this.d_ino, true);
    view.setUint32(ptr + 16, this.dir_name.length, true);
    view.setUint8(ptr + 20, this.d_type);
  }
  write_name_bytes(view8, ptr, buf_len) {
    view8.set(
      this.dir_name.slice(0, Math.min(this.dir_name.byteLength, buf_len)),
      ptr,
    );
  }
  constructor(next_cookie, name, type) {
    this.d_ino = 0n;
    const encoded_name = new TextEncoder().encode(name);
    this.d_next = next_cookie;
    this.d_namlen = encoded_name.byteLength;
    this.d_type = type;
    this.dir_name = encoded_name;
  }
}
const ADVICE_NORMAL = 0;
const ADVICE_SEQUENTIAL = 1;
const ADVICE_RANDOM = 2;
const ADVICE_WILLNEED = 3;
const ADVICE_DONTNEED = 4;
const ADVICE_NOREUSE = 5;
const FDFLAGS_APPEND = 1 << 0;
const FDFLAGS_DSYNC = 1 << 1;
const FDFLAGS_NONBLOCK = 1 << 2;
const FDFLAGS_RSYNC = 1 << 3;
const FDFLAGS_SYNC = 1 << 4;
class Fdstat {
  write_bytes(view, ptr) {
    view.setUint8(ptr, this.fs_filetype);
    view.setUint16(ptr + 2, this.fs_flags, true);
    view.setBigUint64(ptr + 8, this.fs_rights_base, true);
    view.setBigUint64(ptr + 16, this.fs_rights_inherited, true);
  }
  constructor(filetype, flags) {
    this.fs_rights_base = 0n;
    this.fs_rights_inherited = 0n;
    this.fs_filetype = filetype;
    this.fs_flags = flags;
  }
}
const FSTFLAGS_ATIM = 1 << 0;
const FSTFLAGS_ATIM_NOW = 1 << 1;
const FSTFLAGS_MTIM = 1 << 2;
const FSTFLAGS_MTIM_NOW = 1 << 3;
const OFLAGS_CREAT = 1 << 0;
const OFLAGS_DIRECTORY = 1 << 1;
const OFLAGS_EXCL = 1 << 2;
const OFLAGS_TRUNC = 1 << 3;
class Filestat {
  write_bytes(view, ptr) {
    view.setBigUint64(ptr, this.dev, true);
    view.setBigUint64(ptr + 8, this.ino, true);
    view.setUint8(ptr + 16, this.filetype);
    view.setBigUint64(ptr + 24, this.nlink, true);
    view.setBigUint64(ptr + 32, this.size, true);
    view.setBigUint64(ptr + 38, this.atim, true);
    view.setBigUint64(ptr + 46, this.mtim, true);
    view.setBigUint64(ptr + 52, this.ctim, true);
  }
  constructor(filetype, size) {
    this.dev = 0n;
    this.ino = 0n;
    this.nlink = 0n;
    this.atim = 0n;
    this.mtim = 0n;
    this.ctim = 0n;
    this.filetype = filetype;
    this.size = size;
  }
}
const EVENTTYPE_CLOCK = 0;
const EVENTTYPE_FD_READ = 1;
const EVENTTYPE_FD_WRITE = 2;
const EVENTRWFLAGS_FD_READWRITE_HANGUP = 1 << 0;
const SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME = 1 << 0;
const SIGNAL_NONE = 0;
const SIGNAL_HUP = 1;
const SIGNAL_INT = 2;
const SIGNAL_QUIT = 3;
const SIGNAL_ILL = 4;
const SIGNAL_TRAP = 5;
const SIGNAL_ABRT = 6;
const SIGNAL_BUS = 7;
const SIGNAL_FPE = 8;
const SIGNAL_KILL = 9;
const SIGNAL_USR1 = 10;
const SIGNAL_SEGV = 11;
const SIGNAL_USR2 = 12;
const SIGNAL_PIPE = 13;
const SIGNAL_ALRM = 14;
const SIGNAL_TERM = 15;
const SIGNAL_CHLD = 16;
const SIGNAL_CONT = 17;
const SIGNAL_STOP = 18;
const SIGNAL_TSTP = 19;
const SIGNAL_TTIN = 20;
const SIGNAL_TTOU = 21;
const SIGNAL_URG = 22;
const SIGNAL_XCPU = 23;
const SIGNAL_XFSZ = 24;
const SIGNAL_VTALRM = 25;
const SIGNAL_PROF = 26;
const SIGNAL_WINCH = 27;
const SIGNAL_POLL = 28;
const SIGNAL_PWR = 29;
const SIGNAL_SYS = 30;
const RIFLAGS_RECV_PEEK = 1 << 0;
const RIFLAGS_RECV_WAITALL = 1 << 1;
const ROFLAGS_RECV_DATA_TRUNCATED = 1 << 0;
const SDFLAGS_RD = 1 << 0;
const SDFLAGS_WR = 1 << 1;
const PREOPENTYPE_DIR = 0;
class PrestatDir {
  write_bytes(view, ptr) {
    view.setUint32(ptr, this.pr_name.byteLength, true);
  }
  constructor(name) {
    this.pr_name = new TextEncoder().encode(name);
  }
}
class Prestat {
  static dir(name) {
    const prestat = new Prestat();
    prestat.tag = PREOPENTYPE_DIR;
    prestat.inner = new PrestatDir(name);
    return prestat;
  }
  write_bytes(view, ptr) {
    view.setUint32(ptr, this.tag, true);
    this.inner.write_bytes(view, ptr + 4);
  }
}
let Debug = class Debug {
  enable(enabled) {
    this.log = createLogger(
      enabled === undefined ? true : enabled,
      this.prefix,
    );
  }
  get enabled() {
    return this.isEnabled;
  }
  constructor(isEnabled) {
    this.isEnabled = isEnabled;
    this.prefix = "wasi:";
    this.enable(isEnabled);
  }
};
function createLogger(enabled, prefix) {
  if (enabled) {
    const a = console.log.bind(console, "%c%s", "color: #265BA0", prefix);
    return a;
  } else {
    return () => {};
  }
}
const debug = new Debug(false);
function strace(imports, no_trace) {
  return new Proxy(imports, {
    get(target, prop, receiver) {
      const f = Reflect.get(target, prop, receiver);
      if (no_trace.includes(prop)) {
        return f;
      }
      return function (...args) {
        console.log(prop, "(", ...args, ")");
        const result = Reflect.apply(f, receiver, args);
        console.log(" =", result);
        return result;
      };
    },
  });
}
class Fd {
  fd_allocate(offset, len) {
    return ERRNO_NOTSUP;
  }
  fd_close() {
    return 0;
  }
  fd_fdstat_get() {
    return { ret: ERRNO_NOTSUP, fdstat: null };
  }
  fd_fdstat_set_flags(flags) {
    return ERRNO_NOTSUP;
  }
  fd_fdstat_set_rights(fs_rights_base, fs_rights_inheriting) {
    return ERRNO_NOTSUP;
  }
  fd_filestat_get() {
    return { ret: ERRNO_NOTSUP, filestat: null };
  }
  fd_filestat_set_size(size) {
    return ERRNO_NOTSUP;
  }
  fd_filestat_set_times(atim, mtim, fst_flags) {
    return ERRNO_NOTSUP;
  }
  fd_pread(size, offset) {
    return { ret: ERRNO_NOTSUP, data: new Uint8Array() };
  }
  fd_prestat_get() {
    return { ret: ERRNO_NOTSUP, prestat: null };
  }
  fd_pwrite(data, offset) {
    return { ret: ERRNO_NOTSUP, nwritten: 0 };
  }
  fd_read(size) {
    return { ret: ERRNO_NOTSUP, data: new Uint8Array() };
  }
  fd_readdir_single(cookie) {
    return { ret: ERRNO_NOTSUP, dirent: null };
  }
  fd_seek(offset, whence) {
    return { ret: ERRNO_NOTSUP, offset: 0n };
  }
  fd_sync() {
    return 0;
  }
  fd_tell() {
    return { ret: ERRNO_NOTSUP, offset: 0n };
  }
  fd_write(data) {
    return { ret: ERRNO_NOTSUP, nwritten: 0 };
  }
  path_create_directory(path) {
    return ERRNO_NOTSUP;
  }
  path_filestat_get(flags, path) {
    return { ret: ERRNO_NOTSUP, filestat: null };
  }
  path_filestat_set_times(flags, path, atim, mtim, fst_flags) {
    return ERRNO_NOTSUP;
  }
  path_link(path, inode, allow_dir) {
    return ERRNO_NOTSUP;
  }
  path_unlink(path) {
    return { ret: ERRNO_NOTSUP, inode_obj: null };
  }
  path_lookup(path, dirflags) {
    return { ret: ERRNO_NOTSUP, inode_obj: null };
  }
  path_open(
    dirflags,
    path,
    oflags,
    fs_rights_base,
    fs_rights_inheriting,
    fd_flags,
  ) {
    return { ret: ERRNO_NOTDIR, fd_obj: null };
  }
  path_readlink(path) {
    return { ret: ERRNO_NOTSUP, data: null };
  }
  path_remove_directory(path) {
    return ERRNO_NOTSUP;
  }
  path_rename(old_path, new_fd, new_path) {
    return ERRNO_NOTSUP;
  }
  path_unlink_file(path) {
    return ERRNO_NOTSUP;
  }
}
class Inode {}
class WASIProcExit extends Error {
  constructor(code) {
    super("exit with exit code " + code);
    this.code = code;
  }
}
let WASI = class WASI {
  start(instance) {
    this.inst = instance;
    try {
      instance.exports._start();
      return 0;
    } catch (e) {
      if (e instanceof WASIProcExit) {
        return e.code;
      } else {
        throw e;
      }
    }
  }
  initialize(instance) {
    this.inst = instance;
    if (instance.exports._initialize) {
      instance.exports._initialize();
    }
  }
  constructor(args, env, fds, options = {}) {
    this.args = [];
    this.env = [];
    this.fds = [];
    debug.enable(options.debug);
    this.args = args;
    this.env = env;
    this.fds = fds;
    const self = this;
    this.wasiImport = {
      args_sizes_get(argc, argv_buf_size) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        buffer.setUint32(argc, self.args.length, true);
        let buf_size = 0;
        for (const arg of self.args) {
          buf_size += arg.length + 1;
        }
        buffer.setUint32(argv_buf_size, buf_size, true);
        debug.log(
          buffer.getUint32(argc, true),
          buffer.getUint32(argv_buf_size, true),
        );
        return 0;
      },
      args_get(argv, argv_buf) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        const orig_argv_buf = argv_buf;
        for (let i = 0; i < self.args.length; i++) {
          buffer.setUint32(argv, argv_buf, true);
          argv += 4;
          const arg = new TextEncoder().encode(self.args[i]);
          buffer8.set(arg, argv_buf);
          buffer.setUint8(argv_buf + arg.length, 0);
          argv_buf += arg.length + 1;
        }
        if (debug.enabled) {
          debug.log(
            new TextDecoder().decode(buffer8.slice(orig_argv_buf, argv_buf)),
          );
        }
        return 0;
      },
      environ_sizes_get(environ_count, environ_size) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        buffer.setUint32(environ_count, self.env.length, true);
        let buf_size = 0;
        for (const environ of self.env) {
          buf_size += environ.length + 1;
        }
        buffer.setUint32(environ_size, buf_size, true);
        debug.log(
          buffer.getUint32(environ_count, true),
          buffer.getUint32(environ_size, true),
        );
        return 0;
      },
      environ_get(environ, environ_buf) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        const orig_environ_buf = environ_buf;
        for (let i = 0; i < self.env.length; i++) {
          buffer.setUint32(environ, environ_buf, true);
          environ += 4;
          const e = new TextEncoder().encode(self.env[i]);
          buffer8.set(e, environ_buf);
          buffer.setUint8(environ_buf + e.length, 0);
          environ_buf += e.length + 1;
        }
        if (debug.enabled) {
          debug.log(
            new TextDecoder().decode(
              buffer8.slice(orig_environ_buf, environ_buf),
            ),
          );
        }
        return 0;
      },
      clock_res_get(id, res_ptr) {
        let resolutionValue;
        switch (id) {
          case CLOCKID_MONOTONIC: {
            resolutionValue = 5000n;
            break;
          }
          case CLOCKID_REALTIME: {
            resolutionValue = 1000000n;
            break;
          }
          default:
            return ERRNO_NOSYS;
        }
        const view = new DataView(self.inst.exports.memory.buffer);
        view.setBigUint64(res_ptr, resolutionValue, true);
        return ERRNO_SUCCESS;
      },
      clock_time_get(id, precision, time) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        if (id === CLOCKID_REALTIME) {
          buffer.setBigUint64(
            time,
            BigInt(new Date().getTime()) * 1000000n,
            true,
          );
        } else if (id == CLOCKID_MONOTONIC) {
          let monotonic_time;
          try {
            monotonic_time = BigInt(Math.round(performance.now() * 1e6));
          } catch (e) {
            monotonic_time = 0n;
          }
          buffer.setBigUint64(time, monotonic_time, true);
        } else {
          buffer.setBigUint64(time, 0n, true);
        }
        return 0;
      },
      fd_advise(fd, offset, len, advice) {
        if (self.fds[fd] != undefined) {
          return ERRNO_SUCCESS;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_allocate(fd, offset, len) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_allocate(offset, len);
        } else {
          return ERRNO_BADF;
        }
      },
      fd_close(fd) {
        if (self.fds[fd] != undefined) {
          const ret = self.fds[fd].fd_close();
          self.fds[fd] = undefined;
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_datasync(fd) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_sync();
        } else {
          return ERRNO_BADF;
        }
      },
      fd_fdstat_get(fd, fdstat_ptr) {
        if (self.fds[fd] != undefined) {
          const { ret, fdstat } = self.fds[fd].fd_fdstat_get();
          if (fdstat != null) {
            fdstat.write_bytes(
              new DataView(self.inst.exports.memory.buffer),
              fdstat_ptr,
            );
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_fdstat_set_flags(fd, flags) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_fdstat_set_flags(flags);
        } else {
          return ERRNO_BADF;
        }
      },
      fd_fdstat_set_rights(fd, fs_rights_base, fs_rights_inheriting) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_fdstat_set_rights(
            fs_rights_base,
            fs_rights_inheriting,
          );
        } else {
          return ERRNO_BADF;
        }
      },
      fd_filestat_get(fd, filestat_ptr) {
        if (self.fds[fd] != undefined) {
          const { ret, filestat } = self.fds[fd].fd_filestat_get();
          if (filestat != null) {
            filestat.write_bytes(
              new DataView(self.inst.exports.memory.buffer),
              filestat_ptr,
            );
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_filestat_set_size(fd, size) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_filestat_set_size(size);
        } else {
          return ERRNO_BADF;
        }
      },
      fd_filestat_set_times(fd, atim, mtim, fst_flags) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_filestat_set_times(atim, mtim, fst_flags);
        } else {
          return ERRNO_BADF;
        }
      },
      fd_pread(fd, iovs_ptr, iovs_len, offset, nread_ptr) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const iovecs = Iovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
          let nread = 0;
          for (const iovec of iovecs) {
            const { ret, data } = self.fds[fd].fd_pread(iovec.buf_len, offset);
            if (ret != ERRNO_SUCCESS) {
              buffer.setUint32(nread_ptr, nread, true);
              return ret;
            }
            buffer8.set(data, iovec.buf);
            nread += data.length;
            offset += BigInt(data.length);
            if (data.length != iovec.buf_len) {
              break;
            }
          }
          buffer.setUint32(nread_ptr, nread, true);
          return ERRNO_SUCCESS;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_prestat_get(fd, buf_ptr) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const { ret, prestat } = self.fds[fd].fd_prestat_get();
          if (prestat != null) {
            prestat.write_bytes(buffer, buf_ptr);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_prestat_dir_name(fd, path_ptr, path_len) {
        if (self.fds[fd] != undefined) {
          const { ret, prestat } = self.fds[fd].fd_prestat_get();
          if (prestat == null) {
            return ret;
          }
          const prestat_dir_name = prestat.inner.pr_name;
          const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
          buffer8.set(prestat_dir_name.slice(0, path_len), path_ptr);
          return prestat_dir_name.byteLength > path_len
            ? ERRNO_NAMETOOLONG
            : ERRNO_SUCCESS;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_pwrite(fd, iovs_ptr, iovs_len, offset, nwritten_ptr) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const iovecs = Ciovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
          let nwritten = 0;
          for (const iovec of iovecs) {
            const data = buffer8.slice(iovec.buf, iovec.buf + iovec.buf_len);
            const { ret, nwritten: nwritten_part } = self.fds[fd].fd_pwrite(
              data,
              offset,
            );
            if (ret != ERRNO_SUCCESS) {
              buffer.setUint32(nwritten_ptr, nwritten, true);
              return ret;
            }
            nwritten += nwritten_part;
            offset += BigInt(nwritten_part);
            if (nwritten_part != data.byteLength) {
              break;
            }
          }
          buffer.setUint32(nwritten_ptr, nwritten, true);
          return ERRNO_SUCCESS;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_read(fd, iovs_ptr, iovs_len, nread_ptr) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const iovecs = Iovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
          let nread = 0;
          for (const iovec of iovecs) {
            const { ret, data } = self.fds[fd].fd_read(iovec.buf_len);
            if (ret != ERRNO_SUCCESS) {
              buffer.setUint32(nread_ptr, nread, true);
              return ret;
            }
            buffer8.set(data, iovec.buf);
            nread += data.length;
            if (data.length != iovec.buf_len) {
              break;
            }
          }
          buffer.setUint32(nread_ptr, nread, true);
          return ERRNO_SUCCESS;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_readdir(fd, buf, buf_len, cookie, bufused_ptr) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          let bufused = 0;
          while (true) {
            const { ret, dirent } = self.fds[fd].fd_readdir_single(cookie);
            if (ret != 0) {
              buffer.setUint32(bufused_ptr, bufused, true);
              return ret;
            }
            if (dirent == null) {
              break;
            }
            if (buf_len - bufused < dirent.head_length()) {
              bufused = buf_len;
              break;
            }
            const head_bytes = new ArrayBuffer(dirent.head_length());
            dirent.write_head_bytes(new DataView(head_bytes), 0);
            buffer8.set(
              new Uint8Array(head_bytes).slice(
                0,
                Math.min(head_bytes.byteLength, buf_len - bufused),
              ),
              buf,
            );
            buf += dirent.head_length();
            bufused += dirent.head_length();
            if (buf_len - bufused < dirent.name_length()) {
              bufused = buf_len;
              break;
            }
            dirent.write_name_bytes(buffer8, buf, buf_len - bufused);
            buf += dirent.name_length();
            bufused += dirent.name_length();
            cookie = dirent.d_next;
          }
          buffer.setUint32(bufused_ptr, bufused, true);
          return 0;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_renumber(fd, to) {
        if (self.fds[fd] != undefined && self.fds[to] != undefined) {
          const ret = self.fds[to].fd_close();
          if (ret != 0) {
            return ret;
          }
          self.fds[to] = self.fds[fd];
          self.fds[fd] = undefined;
          return 0;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_seek(fd, offset, whence, offset_out_ptr) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const { ret, offset: offset_out } = self.fds[fd].fd_seek(
            offset,
            whence,
          );
          buffer.setBigInt64(offset_out_ptr, offset_out, true);
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_sync(fd) {
        if (self.fds[fd] != undefined) {
          return self.fds[fd].fd_sync();
        } else {
          return ERRNO_BADF;
        }
      },
      fd_tell(fd, offset_ptr) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const { ret, offset } = self.fds[fd].fd_tell();
          buffer.setBigUint64(offset_ptr, offset, true);
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      fd_write(fd, iovs_ptr, iovs_len, nwritten_ptr) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const iovecs = Ciovec.read_bytes_array(buffer, iovs_ptr, iovs_len);
          let nwritten = 0;
          for (const iovec of iovecs) {
            const data = buffer8.slice(iovec.buf, iovec.buf + iovec.buf_len);
            const { ret, nwritten: nwritten_part } =
              self.fds[fd].fd_write(data);
            if (ret != ERRNO_SUCCESS) {
              buffer.setUint32(nwritten_ptr, nwritten, true);
              return ret;
            }
            nwritten += nwritten_part;
            if (nwritten_part != data.byteLength) {
              break;
            }
          }
          buffer.setUint32(nwritten_ptr, nwritten, true);
          return ERRNO_SUCCESS;
        } else {
          return ERRNO_BADF;
        }
      },
      path_create_directory(fd, path_ptr, path_len) {
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const path = new TextDecoder().decode(
            buffer8.slice(path_ptr, path_ptr + path_len),
          );
          return self.fds[fd].path_create_directory(path);
        } else {
          return ERRNO_BADF;
        }
      },
      path_filestat_get(fd, flags, path_ptr, path_len, filestat_ptr) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const path = new TextDecoder().decode(
            buffer8.slice(path_ptr, path_ptr + path_len),
          );
          const { ret, filestat } = self.fds[fd].path_filestat_get(flags, path);
          if (filestat != null) {
            filestat.write_bytes(buffer, filestat_ptr);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      path_filestat_set_times(
        fd,
        flags,
        path_ptr,
        path_len,
        atim,
        mtim,
        fst_flags,
      ) {
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const path = new TextDecoder().decode(
            buffer8.slice(path_ptr, path_ptr + path_len),
          );
          return self.fds[fd].path_filestat_set_times(
            flags,
            path,
            atim,
            mtim,
            fst_flags,
          );
        } else {
          return ERRNO_BADF;
        }
      },
      path_link(
        old_fd,
        old_flags,
        old_path_ptr,
        old_path_len,
        new_fd,
        new_path_ptr,
        new_path_len,
      ) {
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[old_fd] != undefined && self.fds[new_fd] != undefined) {
          const old_path = new TextDecoder().decode(
            buffer8.slice(old_path_ptr, old_path_ptr + old_path_len),
          );
          const new_path = new TextDecoder().decode(
            buffer8.slice(new_path_ptr, new_path_ptr + new_path_len),
          );
          const { ret, inode_obj } = self.fds[old_fd].path_lookup(
            old_path,
            old_flags,
          );
          if (inode_obj == null) {
            return ret;
          }
          return self.fds[new_fd].path_link(new_path, inode_obj, false);
        } else {
          return ERRNO_BADF;
        }
      },
      path_open(
        fd,
        dirflags,
        path_ptr,
        path_len,
        oflags,
        fs_rights_base,
        fs_rights_inheriting,
        fd_flags,
        opened_fd_ptr,
      ) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const path = new TextDecoder().decode(
            buffer8.slice(path_ptr, path_ptr + path_len),
          );
          debug.log(path);
          const { ret, fd_obj } = self.fds[fd].path_open(
            dirflags,
            path,
            oflags,
            fs_rights_base,
            fs_rights_inheriting,
            fd_flags,
          );
          if (ret != 0) {
            return ret;
          }
          self.fds.push(fd_obj);
          const opened_fd = self.fds.length - 1;
          buffer.setUint32(opened_fd_ptr, opened_fd, true);
          return 0;
        } else {
          return ERRNO_BADF;
        }
      },
      path_readlink(fd, path_ptr, path_len, buf_ptr, buf_len, nread_ptr) {
        const buffer = new DataView(self.inst.exports.memory.buffer);
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const path = new TextDecoder().decode(
            buffer8.slice(path_ptr, path_ptr + path_len),
          );
          debug.log(path);
          const { ret, data } = self.fds[fd].path_readlink(path);
          if (data != null) {
            const data_buf = new TextEncoder().encode(data);
            if (data_buf.length > buf_len) {
              buffer.setUint32(nread_ptr, 0, true);
              return ERRNO_BADF;
            }
            buffer8.set(data_buf, buf_ptr);
            buffer.setUint32(nread_ptr, data_buf.length, true);
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      path_remove_directory(fd, path_ptr, path_len) {
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const path = new TextDecoder().decode(
            buffer8.slice(path_ptr, path_ptr + path_len),
          );
          return self.fds[fd].path_remove_directory(path);
        } else {
          return ERRNO_BADF;
        }
      },
      path_rename(
        fd,
        old_path_ptr,
        old_path_len,
        new_fd,
        new_path_ptr,
        new_path_len,
      ) {
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined && self.fds[new_fd] != undefined) {
          const old_path = new TextDecoder().decode(
            buffer8.slice(old_path_ptr, old_path_ptr + old_path_len),
          );
          const new_path = new TextDecoder().decode(
            buffer8.slice(new_path_ptr, new_path_ptr + new_path_len),
          );
          let { ret, inode_obj } = self.fds[fd].path_unlink(old_path);
          if (inode_obj == null) {
            return ret;
          }
          ret = self.fds[new_fd].path_link(new_path, inode_obj, true);
          if (ret != ERRNO_SUCCESS) {
            if (
              self.fds[fd].path_link(old_path, inode_obj, true) != ERRNO_SUCCESS
            ) {
              throw "path_link should always return success when relinking an inode back to the original place";
            }
          }
          return ret;
        } else {
          return ERRNO_BADF;
        }
      },
      path_symlink(old_path_ptr, old_path_len, fd, new_path_ptr, new_path_len) {
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const old_path = new TextDecoder().decode(
            buffer8.slice(old_path_ptr, old_path_ptr + old_path_len),
          );
          const new_path = new TextDecoder().decode(
            buffer8.slice(new_path_ptr, new_path_ptr + new_path_len),
          );
          return ERRNO_NOTSUP;
        } else {
          return ERRNO_BADF;
        }
      },
      path_unlink_file(fd, path_ptr, path_len) {
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        if (self.fds[fd] != undefined) {
          const path = new TextDecoder().decode(
            buffer8.slice(path_ptr, path_ptr + path_len),
          );
          return self.fds[fd].path_unlink_file(path);
        } else {
          return ERRNO_BADF;
        }
      },
      poll_oneoff(in_, out, nsubscriptions) {
        throw "async io not supported";
      },
      proc_exit(exit_code) {
        throw new WASIProcExit(exit_code);
      },
      proc_raise(sig) {
        throw "raised signal " + sig;
      },
      sched_yield() {},
      random_get(buf, buf_len) {
        const buffer8 = new Uint8Array(self.inst.exports.memory.buffer);
        for (let i = 0; i < buf_len; i++) {
          buffer8[buf + i] = (Math.random() * 256) | 0;
        }
      },
      sock_recv(fd, ri_data, ri_flags) {
        throw "sockets not supported";
      },
      sock_send(fd, si_data, si_flags) {
        throw "sockets not supported";
      },
      sock_shutdown(fd, how) {
        throw "sockets not supported";
      },
      sock_accept(fd, flags) {
        throw "sockets not supported";
      },
    };
  }
};
class SyncOPFSFile extends Inode {
  path_open(oflags, fs_rights_base, fd_flags) {
    if (
      this.readonly &&
      (fs_rights_base & BigInt(RIGHTS_FD_WRITE)) == BigInt(RIGHTS_FD_WRITE)
    ) {
      return { ret: ERRNO_PERM, fd_obj: null };
    }
    if ((oflags & OFLAGS_TRUNC) == OFLAGS_TRUNC) {
      if (this.readonly) return { ret: ERRNO_PERM, fd_obj: null };
      this.handle.truncate(0);
    }
    const file = new OpenSyncOPFSFile(this);
    if (fd_flags & FDFLAGS_APPEND) file.fd_seek(0n, WHENCE_END);
    return { ret: ERRNO_SUCCESS, fd_obj: file };
  }
  get size() {
    return BigInt(this.handle.getSize());
  }
  stat() {
    return new Filestat(FILETYPE_REGULAR_FILE, this.size);
  }
  constructor(handle, options) {
    super();
    this.handle = handle;
    this.readonly = !!options?.readonly;
  }
}
class OpenSyncOPFSFile extends Fd {
  fd_allocate(offset, len) {
    if (BigInt(this.file.handle.getSize()) > offset + len) {
    } else {
      this.file.handle.truncate(Number(offset + len));
    }
    return ERRNO_SUCCESS;
  }
  fd_fdstat_get() {
    return { ret: 0, fdstat: new Fdstat(FILETYPE_REGULAR_FILE, 0) };
  }
  fd_filestat_get() {
    return {
      ret: 0,
      filestat: new Filestat(
        FILETYPE_REGULAR_FILE,
        BigInt(this.file.handle.getSize()),
      ),
    };
  }
  fd_filestat_set_size(size) {
    this.file.handle.truncate(Number(size));
    return ERRNO_SUCCESS;
  }
  fd_read(size) {
    const buf = new Uint8Array(size);
    const n = this.file.handle.read(buf, { at: Number(this.position) });
    this.position += BigInt(n);
    return { ret: 0, data: buf.slice(0, n) };
  }
  fd_seek(offset, whence) {
    let calculated_offset;
    switch (whence) {
      case WHENCE_SET:
        calculated_offset = BigInt(offset);
        break;
      case WHENCE_CUR:
        calculated_offset = this.position + BigInt(offset);
        break;
      case WHENCE_END:
        calculated_offset = BigInt(this.file.handle.getSize()) + BigInt(offset);
        break;
      default:
        return { ret: ERRNO_INVAL, offset: 0n };
    }
    if (calculated_offset < 0) {
      return { ret: ERRNO_INVAL, offset: 0n };
    }
    this.position = calculated_offset;
    return { ret: ERRNO_SUCCESS, offset: this.position };
  }
  fd_write(data) {
    if (this.file.readonly) return { ret: ERRNO_BADF, nwritten: 0 };
    const n = this.file.handle.write(data, { at: Number(this.position) });
    this.position += BigInt(n);
    return { ret: ERRNO_SUCCESS, nwritten: n };
  }
  fd_sync() {
    this.file.handle.flush();
    return ERRNO_SUCCESS;
  }
  constructor(file) {
    super();
    this.position = 0n;
    this.file = file;
  }
}
class OpenFile extends Fd {
  fd_allocate(offset, len) {
    if (this.file.size > offset + len) {
    } else {
      const new_data = new Uint8Array(Number(offset + len));
      new_data.set(this.file.data, 0);
      this.file.data = new_data;
    }
    return ERRNO_SUCCESS;
  }
  fd_fdstat_get() {
    return { ret: 0, fdstat: new Fdstat(FILETYPE_REGULAR_FILE, 0) };
  }
  fd_filestat_set_size(size) {
    if (this.file.size > size) {
      this.file.data = new Uint8Array(
        this.file.data.buffer.slice(0, Number(size)),
      );
    } else {
      const new_data = new Uint8Array(Number(size));
      new_data.set(this.file.data, 0);
      this.file.data = new_data;
    }
    return ERRNO_SUCCESS;
  }
  fd_read(size) {
    const slice = this.file.data.slice(
      Number(this.file_pos),
      Number(this.file_pos + BigInt(size)),
    );
    this.file_pos += BigInt(slice.length);
    return { ret: 0, data: slice };
  }
  fd_pread(size, offset) {
    const slice = this.file.data.slice(
      Number(offset),
      Number(offset + BigInt(size)),
    );
    return { ret: 0, data: slice };
  }
  fd_seek(offset, whence) {
    let calculated_offset;
    switch (whence) {
      case WHENCE_SET:
        calculated_offset = offset;
        break;
      case WHENCE_CUR:
        calculated_offset = this.file_pos + offset;
        break;
      case WHENCE_END:
        calculated_offset = BigInt(this.file.data.byteLength) + offset;
        break;
      default:
        return { ret: ERRNO_INVAL, offset: 0n };
    }
    if (calculated_offset < 0) {
      return { ret: ERRNO_INVAL, offset: 0n };
    }
    this.file_pos = calculated_offset;
    return { ret: 0, offset: this.file_pos };
  }
  fd_tell() {
    return { ret: 0, offset: this.file_pos };
  }
  fd_write(data) {
    if (this.file.readonly) return { ret: ERRNO_BADF, nwritten: 0 };
    if (this.file_pos + BigInt(data.byteLength) > this.file.size) {
      const old = this.file.data;
      this.file.data = new Uint8Array(
        Number(this.file_pos + BigInt(data.byteLength)),
      );
      this.file.data.set(old);
    }
    this.file.data.set(data, Number(this.file_pos));
    this.file_pos += BigInt(data.byteLength);
    return { ret: 0, nwritten: data.byteLength };
  }
  fd_pwrite(data, offset) {
    if (this.file.readonly) return { ret: ERRNO_BADF, nwritten: 0 };
    if (offset + BigInt(data.byteLength) > this.file.size) {
      const old = this.file.data;
      this.file.data = new Uint8Array(Number(offset + BigInt(data.byteLength)));
      this.file.data.set(old);
    }
    this.file.data.set(data, Number(offset));
    return { ret: 0, nwritten: data.byteLength };
  }
  fd_filestat_get() {
    return { ret: 0, filestat: this.file.stat() };
  }
  constructor(file) {
    super();
    this.file_pos = 0n;
    this.file = file;
  }
}
class OpenDirectory extends Fd {
  fd_seek(offset, whence) {
    return { ret: ERRNO_BADF, offset: 0n };
  }
  fd_tell() {
    return { ret: ERRNO_BADF, offset: 0n };
  }
  fd_allocate(offset, len) {
    return ERRNO_BADF;
  }
  fd_fdstat_get() {
    return { ret: 0, fdstat: new Fdstat(FILETYPE_DIRECTORY, 0) };
  }
  fd_readdir_single(cookie) {
    if (debug.enabled) {
      debug.log("readdir_single", cookie);
      debug.log(cookie, this.dir.contents.keys());
    }
    if (cookie == 0n) {
      return {
        ret: ERRNO_SUCCESS,
        dirent: new Dirent(1n, ".", FILETYPE_DIRECTORY),
      };
    } else if (cookie == 1n) {
      return {
        ret: ERRNO_SUCCESS,
        dirent: new Dirent(2n, "..", FILETYPE_DIRECTORY),
      };
    }
    if (cookie >= BigInt(this.dir.contents.size) + 2n) {
      return { ret: 0, dirent: null };
    }
    const [name, entry] = Array.from(this.dir.contents.entries())[
      Number(cookie - 2n)
    ];
    return {
      ret: 0,
      dirent: new Dirent(cookie + 1n, name, entry.stat().filetype),
    };
  }
  path_filestat_get(flags, path_str) {
    const { ret: path_err, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_err, filestat: null };
    }
    const { ret, entry } = this.dir.get_entry_for_path(path);
    if (entry == null) {
      return { ret, filestat: null };
    }
    return { ret: 0, filestat: entry.stat() };
  }
  path_lookup(path_str, dirflags) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_ret, inode_obj: null };
    }
    const { ret, entry } = this.dir.get_entry_for_path(path);
    if (entry == null) {
      return { ret, inode_obj: null };
    }
    return { ret: ERRNO_SUCCESS, inode_obj: entry };
  }
  path_open(
    dirflags,
    path_str,
    oflags,
    fs_rights_base,
    fs_rights_inheriting,
    fd_flags,
  ) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_ret, fd_obj: null };
    }
    let { ret, entry } = this.dir.get_entry_for_path(path);
    if (entry == null) {
      if (ret != ERRNO_NOENT) {
        return { ret, fd_obj: null };
      }
      if ((oflags & OFLAGS_CREAT) == OFLAGS_CREAT) {
        const { ret, entry: new_entry } = this.dir.create_entry_for_path(
          path_str,
          (oflags & OFLAGS_DIRECTORY) == OFLAGS_DIRECTORY,
        );
        if (new_entry == null) {
          return { ret, fd_obj: null };
        }
        entry = new_entry;
      } else {
        return { ret: ERRNO_NOENT, fd_obj: null };
      }
    } else if ((oflags & OFLAGS_EXCL) == OFLAGS_EXCL) {
      return { ret: ERRNO_EXIST, fd_obj: null };
    }
    if (
      (oflags & OFLAGS_DIRECTORY) == OFLAGS_DIRECTORY &&
      entry.stat().filetype !== FILETYPE_DIRECTORY
    ) {
      return { ret: ERRNO_NOTDIR, fd_obj: null };
    }
    return entry.path_open(oflags, fs_rights_base, fd_flags);
  }
  path_create_directory(path) {
    return this.path_open(0, path, OFLAGS_CREAT | OFLAGS_DIRECTORY, 0n, 0n, 0)
      .ret;
  }
  path_link(path_str, inode, allow_dir) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return path_ret;
    }
    if (path.is_dir) {
      return ERRNO_NOENT;
    }
    const {
      ret: parent_ret,
      parent_entry,
      filename,
      entry,
    } = this.dir.get_parent_dir_and_entry_for_path(path, true);
    if (parent_entry == null || filename == null) {
      return parent_ret;
    }
    if (entry != null) {
      const source_is_dir = inode.stat().filetype == FILETYPE_DIRECTORY;
      const target_is_dir = entry.stat().filetype == FILETYPE_DIRECTORY;
      if (source_is_dir && target_is_dir) {
        if (allow_dir && entry instanceof Directory) {
          if (entry.contents.size == 0) {
          } else {
            return ERRNO_NOTEMPTY;
          }
        } else {
          return ERRNO_EXIST;
        }
      } else if (source_is_dir && !target_is_dir) {
        return ERRNO_NOTDIR;
      } else if (!source_is_dir && target_is_dir) {
        return ERRNO_ISDIR;
      } else if (
        inode.stat().filetype == FILETYPE_REGULAR_FILE &&
        entry.stat().filetype == FILETYPE_REGULAR_FILE
      ) {
      } else {
        return ERRNO_EXIST;
      }
    }
    if (!allow_dir && inode.stat().filetype == FILETYPE_DIRECTORY) {
      return ERRNO_PERM;
    }
    parent_entry.contents.set(filename, inode);
    return ERRNO_SUCCESS;
  }
  path_unlink(path_str) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_ret, inode_obj: null };
    }
    const {
      ret: parent_ret,
      parent_entry,
      filename,
      entry,
    } = this.dir.get_parent_dir_and_entry_for_path(path, true);
    if (parent_entry == null || filename == null) {
      return { ret: parent_ret, inode_obj: null };
    }
    if (entry == null) {
      return { ret: ERRNO_NOENT, inode_obj: null };
    }
    parent_entry.contents.delete(filename);
    return { ret: ERRNO_SUCCESS, inode_obj: entry };
  }
  path_unlink_file(path_str) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return path_ret;
    }
    const {
      ret: parent_ret,
      parent_entry,
      filename,
      entry,
    } = this.dir.get_parent_dir_and_entry_for_path(path, false);
    if (parent_entry == null || filename == null || entry == null) {
      return parent_ret;
    }
    if (entry.stat().filetype === FILETYPE_DIRECTORY) {
      return ERRNO_ISDIR;
    }
    parent_entry.contents.delete(filename);
    return ERRNO_SUCCESS;
  }
  path_remove_directory(path_str) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return path_ret;
    }
    const {
      ret: parent_ret,
      parent_entry,
      filename,
      entry,
    } = this.dir.get_parent_dir_and_entry_for_path(path, false);
    if (parent_entry == null || filename == null || entry == null) {
      return parent_ret;
    }
    if (
      !(entry instanceof Directory) ||
      entry.stat().filetype !== FILETYPE_DIRECTORY
    ) {
      return ERRNO_NOTDIR;
    }
    if (entry.contents.size !== 0) {
      return ERRNO_NOTEMPTY;
    }
    if (!parent_entry.contents.delete(filename)) {
      return ERRNO_NOENT;
    }
    return ERRNO_SUCCESS;
  }
  fd_filestat_get() {
    return { ret: 0, filestat: this.dir.stat() };
  }
  fd_filestat_set_size(size) {
    return ERRNO_BADF;
  }
  fd_read(size) {
    return { ret: ERRNO_BADF, data: new Uint8Array() };
  }
  fd_pread(size, offset) {
    return { ret: ERRNO_BADF, data: new Uint8Array() };
  }
  fd_write(data) {
    return { ret: ERRNO_BADF, nwritten: 0 };
  }
  fd_pwrite(data, offset) {
    return { ret: ERRNO_BADF, nwritten: 0 };
  }
  constructor(dir) {
    super();
    this.dir = dir;
  }
}
class PreopenDirectory extends OpenDirectory {
  fd_prestat_get() {
    return { ret: 0, prestat: Prestat.dir(this.prestat_name) };
  }
  constructor(name, contents) {
    super(new Directory(contents));
    this.prestat_name = name;
  }
}
class File extends Inode {
  path_open(oflags, fs_rights_base, fd_flags) {
    if (
      this.readonly &&
      (fs_rights_base & BigInt(RIGHTS_FD_WRITE)) == BigInt(RIGHTS_FD_WRITE)
    ) {
      return { ret: ERRNO_PERM, fd_obj: null };
    }
    if ((oflags & OFLAGS_TRUNC) == OFLAGS_TRUNC) {
      if (this.readonly) return { ret: ERRNO_PERM, fd_obj: null };
      this.data = new Uint8Array([]);
    }
    const file = new OpenFile(this);
    if (fd_flags & FDFLAGS_APPEND) file.fd_seek(0n, WHENCE_END);
    return { ret: ERRNO_SUCCESS, fd_obj: file };
  }
  get size() {
    return BigInt(this.data.byteLength);
  }
  stat() {
    return new Filestat(FILETYPE_REGULAR_FILE, this.size);
  }
  constructor(data, options) {
    super();
    this.data = new Uint8Array(data);
    this.readonly = !!options?.readonly;
  }
}
let Path = class Path {
  static from(path) {
    const self = new Path();
    self.is_dir = path.endsWith("/");
    if (path.startsWith("/")) {
      return { ret: ERRNO_NOTCAPABLE, path: null };
    }
    if (path.includes("\x00")) {
      return { ret: ERRNO_INVAL, path: null };
    }
    for (const component of path.split("/")) {
      if (component === "" || component === ".") {
        continue;
      }
      if (component === "..") {
        if (self.parts.pop() == undefined) {
          return { ret: ERRNO_NOTCAPABLE, path: null };
        }
        continue;
      }
      self.parts.push(component);
    }
    return { ret: ERRNO_SUCCESS, path: self };
  }
  to_path_string() {
    let s = this.parts.join("/");
    if (this.is_dir) {
      s += "/";
    }
    return s;
  }
  constructor() {
    this.parts = [];
    this.is_dir = false;
  }
};
class Directory extends Inode {
  path_open(oflags, fs_rights_base, fd_flags) {
    return { ret: ERRNO_SUCCESS, fd_obj: new OpenDirectory(this) };
  }
  stat() {
    return new Filestat(FILETYPE_DIRECTORY, 0n);
  }
  get_entry_for_path(path) {
    let entry = this;
    for (const component of path.parts) {
      if (!(entry instanceof Directory)) {
        return { ret: ERRNO_NOTDIR, entry: null };
      }
      const child = entry.contents.get(component);
      if (child !== undefined) {
        entry = child;
      } else {
        debug.log(component);
        return { ret: ERRNO_NOENT, entry: null };
      }
    }
    if (path.is_dir) {
      if (entry.stat().filetype != FILETYPE_DIRECTORY) {
        return { ret: ERRNO_NOTDIR, entry: null };
      }
    }
    return { ret: ERRNO_SUCCESS, entry };
  }
  get_parent_dir_and_entry_for_path(path, allow_undefined) {
    const filename = path.parts.pop();
    if (filename === undefined) {
      return {
        ret: ERRNO_INVAL,
        parent_entry: null,
        filename: null,
        entry: null,
      };
    }
    const { ret: entry_ret, entry: parent_entry } =
      this.get_entry_for_path(path);
    if (parent_entry == null) {
      return {
        ret: entry_ret,
        parent_entry: null,
        filename: null,
        entry: null,
      };
    }
    if (!(parent_entry instanceof Directory)) {
      return {
        ret: ERRNO_NOTDIR,
        parent_entry: null,
        filename: null,
        entry: null,
      };
    }
    const entry = parent_entry.contents.get(filename);
    if (entry === undefined) {
      if (!allow_undefined) {
        return {
          ret: ERRNO_NOENT,
          parent_entry: null,
          filename: null,
          entry: null,
        };
      } else {
        return { ret: ERRNO_SUCCESS, parent_entry, filename, entry: null };
      }
    }
    if (path.is_dir) {
      if (entry.stat().filetype != FILETYPE_DIRECTORY) {
        return {
          ret: ERRNO_NOTDIR,
          parent_entry: null,
          filename: null,
          entry: null,
        };
      }
    }
    return { ret: ERRNO_SUCCESS, parent_entry, filename, entry };
  }
  create_entry_for_path(path_str, is_dir) {
    const { ret: path_ret, path } = Path.from(path_str);
    if (path == null) {
      return { ret: path_ret, entry: null };
    }
    let {
      ret: parent_ret,
      parent_entry,
      filename,
      entry,
    } = this.get_parent_dir_and_entry_for_path(path, true);
    if (parent_entry == null || filename == null) {
      return { ret: parent_ret, entry: null };
    }
    if (entry != null) {
      return { ret: ERRNO_EXIST, entry: null };
    }
    debug.log("create", path);
    let new_child;
    if (!is_dir) {
      new_child = new File(new ArrayBuffer(0));
    } else {
      new_child = new Directory(new Map());
    }
    parent_entry.contents.set(filename, new_child);
    entry = new_child;
    return { ret: ERRNO_SUCCESS, entry };
  }
  constructor(contents) {
    super();
    if (contents instanceof Array) {
      this.contents = new Map(contents);
    } else {
      this.contents = contents;
    }
  }
}
class ConsoleStdout extends Fd {
  fd_filestat_get() {
    const filestat = new Filestat(FILETYPE_CHARACTER_DEVICE, BigInt(0));
    return { ret: 0, filestat };
  }
  fd_fdstat_get() {
    const fdstat = new Fdstat(FILETYPE_CHARACTER_DEVICE, 0);
    fdstat.fs_rights_base = BigInt(RIGHTS_FD_WRITE);
    return { ret: 0, fdstat };
  }
  fd_write(data) {
    this.write(data);
    return { ret: 0, nwritten: data.byteLength };
  }
  static lineBuffered(write) {
    const dec = new TextDecoder("utf-8", { fatal: false });
    let line_buf = "";
    return new ConsoleStdout((buffer) => {
      line_buf += dec.decode(buffer, { stream: true });
      const lines = line_buf.split("\n");
      for (const [i, line] of lines.entries()) {
        if (i < lines.length - 1) {
          write(line);
        } else {
          line_buf = line;
        }
      }
    });
  }
  constructor(write) {
    super();
    this.write = write;
  }
}
// This script is intended to be used by D8, JSShell or JSC. We distinguish
// them by the functions they offer to read files:
//
// Engine         | Shell    | FileRead             |  Arguments
// --------------------------------------------------------------
// V8             | D8       | readbuffer           |  arguments (arg0 arg1)
// JavaScriptCore | JSC      | readFile             |  arguments (arg0 arg1)
// SpiderMonkey   | JSShell  | readRelativeToScript |  scriptArgs (-- arg0 arg1)
//
const isD8 = typeof readbuffer === "function";
const isJSC = typeof readFile === "function";
const isJSShell = typeof readRelativeToScript === "function";

if (isD8) {
  // D8's performance.measure is API incompatible with the browser version.
  //
  // (see also dart2js's `sdk/**/js_runtime/lib/preambles/d8.js`)
  delete performance.measure;
}

var args = isD8 || isJSC ? arguments : scriptArgs;
var pythonArgs = [];
const argsSplit = args.indexOf("--");
if (argsSplit != -1) {
  pythonArgs = args.slice(argsSplit + 1);
  args = args.slice(0, argsSplit);
}

function read_file(filename) {
  // Create a Wasm module from the binary Wasm file.
  var bytes;
  if (isJSC) {
    bytes = readFile(filename, "binary");
  } else if (isD8) {
    bytes = readbuffer(filename);
  } else {
    bytes = readRelativeToScript(filename, "binary");
  }
  return bytes;
}
function compile(bytes, withJsStringBuiltins) {
  return WebAssembly.compile(
    bytes,
    withJsStringBuiltins ? { builtins: ["js-string"] } : {},
  );
}

(function (self, scriptArguments) {
  // Using strict mode to avoid accidentally defining global variables.
  "use strict"; // Should be first statement of this function.

  // Task queue as cyclic list queue.
  var taskQueue = new Array(8); // Length is power of 2.
  var head = 0;
  var tail = 0;
  var mask = taskQueue.length - 1;

  function addTask(elem) {
    taskQueue[head] = elem;
    head = (head + 1) & mask;
    if (head == tail) _growTaskQueue();
  }

  function removeTask() {
    if (head == tail) return;
    var result = taskQueue[tail];
    taskQueue[tail] = undefined;
    tail = (tail + 1) & mask;
    return result;
  }

  function _growTaskQueue() {
    // head == tail.
    var length = taskQueue.length;
    var split = head;
    taskQueue.length = length * 2;
    if (split * 2 < length) {
      // split < length / 2
      for (var i = 0; i < split; i++) {
        taskQueue[length + i] = taskQueue[i];
        taskQueue[i] = undefined;
      }
      head += length;
    } else {
      for (var i = split; i < length; i++) {
        taskQueue[length + i] = taskQueue[i];
        taskQueue[i] = undefined;
      }
      tail += length;
    }
    mask = taskQueue.length - 1;
  }

  // Mapping from timer id to timer function.
  // The timer id is written on the function as .$timerId.
  // That field is cleared when the timer is cancelled, but it is not returned
  // from the queue until its time comes.
  var timerIds = {};
  var timerIdCounter = 1; // Counter used to assign ids.

  // Zero-timer queue as simple array queue using push/shift.
  var zeroTimerQueue = [];

  function addTimer(f, ms) {
    ms = Math.max(0, ms);
    var id = timerIdCounter++;
    // A callback can be scheduled at most once.
    console.assert(f.$timerId === undefined);
    f.$timerId = id;
    timerIds[id] = f;
    if (ms == 0 && !isNextTimerDue()) {
      zeroTimerQueue.push(f);
    } else {
      addDelayedTimer(f, ms);
    }
    return id;
  }

  function nextZeroTimer() {
    while (zeroTimerQueue.length > 0) {
      var action = zeroTimerQueue.shift();
      if (action.$timerId !== undefined) return action;
    }
  }

  function nextEvent() {
    var action = removeTask();
    if (action) {
      return action;
    }
    do {
      action = nextZeroTimer();
      if (action) break;
      var nextList = nextDelayedTimerQueue();
      if (!nextList) {
        return;
      }
      var newTime = nextList.shift();
      advanceTimeTo(newTime);
      zeroTimerQueue = nextList;
    } while (true);
    var id = action.$timerId;
    clearTimerId(action, id);
    return action;
  }

  // Mocking time.
  var timeOffset = 0;
  var now = function () {
    // Install the mock Date object only once.
    // Following calls to "now" will just use the new (mocked) Date.now
    // method directly.
    installMockDate();
    now = Date.now;
    return Date.now();
  };
  var originalDate = Date;
  var originalNow = originalDate.now;

  function advanceTimeTo(time) {
    var now = originalNow();
    if (timeOffset < time - now) {
      timeOffset = time - now;
    }
  }

  function installMockDate() {
    var NewDate = function Date(Y, M, D, h, m, s, ms) {
      if (this instanceof Date) {
        // Assume a construct call.
        switch (arguments.length) {
          case 0:
            return new originalDate(originalNow() + timeOffset);
          case 1:
            return new originalDate(Y);
          case 2:
            return new originalDate(Y, M);
          case 3:
            return new originalDate(Y, M, D);
          case 4:
            return new originalDate(Y, M, D, h);
          case 5:
            return new originalDate(Y, M, D, h, m);
          case 6:
            return new originalDate(Y, M, D, h, m, s);
          default:
            return new originalDate(Y, M, D, h, m, s, ms);
        }
      }
      return new originalDate(originalNow() + timeOffset).toString();
    };
    NewDate.UTC = originalDate.UTC;
    NewDate.parse = originalDate.parse;
    NewDate.now = function now() {
      return originalNow() + timeOffset;
    };
    NewDate.prototype = originalDate.prototype;
    originalDate.prototype.constructor = NewDate;
    Date = NewDate;
  }

  // Heap priority queue with key index.
  // Each entry is list of [timeout, callback1 ... callbackn].
  var timerHeap = [];
  var timerIndex = {};

  function addDelayedTimer(f, ms) {
    var timeout = now() + ms;
    var timerList = timerIndex[timeout];
    if (timerList == null) {
      timerList = [timeout, f];
      timerIndex[timeout] = timerList;
      var index = timerHeap.length;
      timerHeap.length += 1;
      bubbleUp(index, timeout, timerList);
    } else {
      timerList.push(f);
    }
  }

  function isNextTimerDue() {
    if (timerHeap.length == 0) return false;
    var head = timerHeap[0];
    return head[0] < originalNow() + timeOffset;
  }

  function nextDelayedTimerQueue() {
    if (timerHeap.length == 0) return null;
    var result = timerHeap[0];
    var last = timerHeap.pop();
    if (timerHeap.length > 0) {
      bubbleDown(0, last[0], last);
    }
    return result;
  }

  function bubbleUp(index, key, value) {
    while (index != 0) {
      var parentIndex = (index - 1) >> 1;
      var parent = timerHeap[parentIndex];
      var parentKey = parent[0];
      if (key > parentKey) break;
      timerHeap[index] = parent;
      index = parentIndex;
    }
    timerHeap[index] = value;
  }

  function bubbleDown(index, key, value) {
    while (true) {
      var leftChildIndex = index * 2 + 1;
      if (leftChildIndex >= timerHeap.length) break;
      var minChildIndex = leftChildIndex;
      var minChild = timerHeap[leftChildIndex];
      var minChildKey = minChild[0];
      var rightChildIndex = leftChildIndex + 1;
      if (rightChildIndex < timerHeap.length) {
        var rightChild = timerHeap[rightChildIndex];
        var rightKey = rightChild[0];
        if (rightKey < minChildKey) {
          minChildIndex = rightChildIndex;
          minChild = rightChild;
          minChildKey = rightKey;
        }
      }
      if (minChildKey > key) break;
      timerHeap[index] = minChild;
      index = minChildIndex;
    }
    timerHeap[index] = value;
  }

  function addInterval(f, ms) {
    ms = Math.max(0, ms);
    var id = timerIdCounter++;
    function repeat() {
      // Reactivate with the same id.
      repeat.$timerId = id;
      timerIds[id] = repeat;
      addDelayedTimer(repeat, ms);
      f();
    }
    repeat.$timerId = id;
    timerIds[id] = repeat;
    addDelayedTimer(repeat, ms);
    return id;
  }

  function cancelTimer(id) {
    var f = timerIds[id];
    if (f == null) return;
    clearTimerId(f, id);
  }

  function clearTimerId(f, id) {
    f.$timerId = undefined;
    delete timerIds[id];
  }

  async function eventLoop(action) {
    if (isJSC) asyncTestStart(1);
    while (action) {
      try {
        await action();
      } catch (e) {
        // JSC doesn't report/print uncaught async exceptions for some reason.
        if (isJSC) {
          print("Error: " + e);
          print("Stack: " + e.stack);
        }
        if (typeof onerror == "function") {
          onerror(e, null, -1);
        } else {
          throw e;
        }
      }
      action = nextEvent();
    }
    if (isJSC) asyncTestPassed();
  }

  // Global properties. "self" refers to the global object, so adding a
  // property to "self" defines a global variable.
  self.self = self;
  self.wasi_runner = function (main) {
    // Initialize.
    var action = async function () {
      await main();
    };
    eventLoop(action);
  };
  self.setTimeout = addTimer;
  self.clearTimeout = cancelTimer;
  self.setInterval = addInterval;
  self.clearInterval = cancelTimer;
  self.queueMicrotask = addTask;

  self.location = {};

  // Signals `Stopwatch._initTicker` to use `Date.now` to get ticks instead of
  // `performance.now`, as it's not available in d8.
  self.dartUseDateNowForTicks = true;
})(this, []);

async function wasi_main() {
  let wasi_args = ["python", "/testcase.py"];
  let env = ["PYTHONPATH=/lib.wasi-wasm32-3.13-pydebug"];
  let fds = [
    new OpenFile(new File([])), // stdin
    ConsoleStdout.lineBuffered((msg) => print(`[WASI stdout] ${msg}`)),
    ConsoleStdout.lineBuffered((msg) => print(`[WASI stderr] ${msg}`)),
    new PreopenDirectory("/", [
      ["testcase.py", new File(new TextEncoder().encode(read("./testcase.py")))],
      
    ]),
    new PreopenDirectory("/Modules",[
      ["expat", new Directory([
      ])],
      ["cjkcodecs", new Directory([
      ])],
      ["_sre", new Directory([
      ])],
      ["_io", new Directory([
      ])],
      ["_testcapi", new Directory([
      ])],
      ["_testinternalcapi", new Directory([
      ])],
      ["_ctypes", new Directory([
      ])],
      ["Setup.local", new File(new TextEncoder().encode(read("./Modules/Setup.local")))],
      ["_xxtestfuzz", new Directory([
      ])],
      ["_multiprocessing", new Directory([
      ])],
      ["_hacl", new Directory([
      ])],
      ["_decimal", new Directory([
      ["libmpdec", new Directory([
      ])],
      ])],
      ["Setup.bootstrap", new File(new TextEncoder().encode(read("./Modules/Setup.bootstrap")))],
      ["_blake2", new Directory([
      ])],
      ["_testlimitedcapi", new Directory([
      ])],
      ["ld_so_aix", new File(new TextEncoder().encode(read("./Modules/ld_so_aix")))],
      ["Setup.stdlib", new File(new TextEncoder().encode(read("./Modules/Setup.stdlib")))],
      ["config.c", new File(new TextEncoder().encode(read("./Modules/config.c")))],
      ["_sqlite", new Directory([
      ])],
      ]),
    new PreopenDirectory("/lib.wasi-wasm32-3.13-pydebug",
    [
        ["__pycache__", new Directory([
        ["_sysconfigdata_d_wasi_wasm32-wasi.cpython-313.pyc", new File(read_file("./lib.wasi-wasm32-3.13-pydebug/__pycache__/_sysconfigdata_d_wasi_wasm32-wasi.cpython-313.pyc"))],
        ])],
        ["_sysconfigdata_d_wasi_wasm32-wasi.py", new File(new TextEncoder().encode(read("./lib.wasi-wasm32-3.13-pydebug/_sysconfigdata_d_wasi_wasm32-wasi.py")))],
      
    ]),

    new PreopenDirectory("/Lib", [

                ["pydoc_data", new Directory([
                ["topics.py", new File(new TextEncoder().encode(read("./lib/pydoc_data/topics.py")))],
                ["_pydoc.css", new File(new TextEncoder().encode(read("./lib/pydoc_data/_pydoc.css")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/pydoc_data/__init__.py")))],
                ])],
                ["zipapp.py", new File(new TextEncoder().encode(read("./lib/zipapp.py")))],
                ["abc.py", new File(new TextEncoder().encode(read("./lib/abc.py")))],
                ["compileall.py", new File(new TextEncoder().encode(read("./lib/compileall.py")))],
                ["turtle.py", new File(new TextEncoder().encode(read("./lib/turtle.py")))],
                ["uuid.py", new File(new TextEncoder().encode(read("./lib/uuid.py")))],
                ["optparse.py", new File(new TextEncoder().encode(read("./lib/optparse.py")))],
                ["modulefinder.py", new File(new TextEncoder().encode(read("./lib/modulefinder.py")))],
                ["socket.py", new File(new TextEncoder().encode(read("./lib/socket.py")))],
                ["_compat_pickle.py", new File(new TextEncoder().encode(read("./lib/_compat_pickle.py")))],
                ["mailbox.py", new File(new TextEncoder().encode(read("./lib/mailbox.py")))],
                ["nturl2path.py", new File(new TextEncoder().encode(read("./lib/nturl2path.py")))],
                ["_opcode_metadata.py", new File(new TextEncoder().encode(read("./lib/_opcode_metadata.py")))],
                ["json", new Directory([
                ["scanner.py", new File(new TextEncoder().encode(read("./lib/json/scanner.py")))],
                ["encoder.py", new File(new TextEncoder().encode(read("./lib/json/encoder.py")))],
                ["tool.py", new File(new TextEncoder().encode(read("./lib/json/tool.py")))],
                ["decoder.py", new File(new TextEncoder().encode(read("./lib/json/decoder.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/json/__init__.py")))],
                ])],
                ["shutil.py", new File(new TextEncoder().encode(read("./lib/shutil.py")))],
                ["textwrap.py", new File(new TextEncoder().encode(read("./lib/textwrap.py")))],
                ["pstats.py", new File(new TextEncoder().encode(read("./lib/pstats.py")))],
                ["sqlite3", new Directory([
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/sqlite3/__main__.py")))],
                ["dbapi2.py", new File(new TextEncoder().encode(read("./lib/sqlite3/dbapi2.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/sqlite3/__init__.py")))],
                ["dump.py", new File(new TextEncoder().encode(read("./lib/sqlite3/dump.py")))],
                ])],
                ["cmd.py", new File(new TextEncoder().encode(read("./lib/cmd.py")))],
                ["reprlib.py", new File(new TextEncoder().encode(read("./lib/reprlib.py")))],
                ["typing.py", new File(new TextEncoder().encode(read("./lib/typing.py")))],
                ["ast.py", new File(new TextEncoder().encode(read("./lib/ast.py")))],
                ["posixpath.py", new File(new TextEncoder().encode(read("./lib/posixpath.py")))],
                ["timeit.py", new File(new TextEncoder().encode(read("./lib/timeit.py")))],
                ["_osx_support.py", new File(new TextEncoder().encode(read("./lib/_osx_support.py")))],
                ["symtable.py", new File(new TextEncoder().encode(read("./lib/symtable.py")))],
                ["tabnanny.py", new File(new TextEncoder().encode(read("./lib/tabnanny.py")))],
                ["lzma.py", new File(new TextEncoder().encode(read("./lib/lzma.py")))],
                ["warnings.py", new File(new TextEncoder().encode(read("./lib/warnings.py")))],
                ["sched.py", new File(new TextEncoder().encode(read("./lib/sched.py")))],
                ["email", new Directory([
                ["contentmanager.py", new File(new TextEncoder().encode(read("./lib/email/contentmanager.py")))],
                ["mime", new Directory([
                ["multipart.py", new File(new TextEncoder().encode(read("./lib/email/mime/multipart.py")))],
                ["text.py", new File(new TextEncoder().encode(read("./lib/email/mime/text.py")))],
                ["application.py", new File(new TextEncoder().encode(read("./lib/email/mime/application.py")))],
                ["message.py", new File(new TextEncoder().encode(read("./lib/email/mime/message.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/email/mime/__init__.py")))],
                ["nonmultipart.py", new File(new TextEncoder().encode(read("./lib/email/mime/nonmultipart.py")))],
                ["audio.py", new File(new TextEncoder().encode(read("./lib/email/mime/audio.py")))],
                ["base.py", new File(new TextEncoder().encode(read("./lib/email/mime/base.py")))],
                ["image.py", new File(new TextEncoder().encode(read("./lib/email/mime/image.py")))],
                ])],
                ["policy.py", new File(new TextEncoder().encode(read("./lib/email/policy.py")))],
                ["_header_value_parser.py", new File(new TextEncoder().encode(read("./lib/email/_header_value_parser.py")))],
                ["base64mime.py", new File(new TextEncoder().encode(read("./lib/email/base64mime.py")))],
                ["headerregistry.py", new File(new TextEncoder().encode(read("./lib/email/headerregistry.py")))],
                ["feedparser.py", new File(new TextEncoder().encode(read("./lib/email/feedparser.py")))],
                ["header.py", new File(new TextEncoder().encode(read("./lib/email/header.py")))],
                ["utils.py", new File(new TextEncoder().encode(read("./lib/email/utils.py")))],
                ["quoprimime.py", new File(new TextEncoder().encode(read("./lib/email/quoprimime.py")))],
                ["parser.py", new File(new TextEncoder().encode(read("./lib/email/parser.py")))],
                ["charset.py", new File(new TextEncoder().encode(read("./lib/email/charset.py")))],
                ["_encoded_words.py", new File(new TextEncoder().encode(read("./lib/email/_encoded_words.py")))],
                ["message.py", new File(new TextEncoder().encode(read("./lib/email/message.py")))],
                ["architecture.rst", new File(new TextEncoder().encode(read("./lib/email/architecture.rst")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/email/__init__.py")))],
                ["generator.py", new File(new TextEncoder().encode(read("./lib/email/generator.py")))],
                ["errors.py", new File(new TextEncoder().encode(read("./lib/email/errors.py")))],
                ["_policybase.py", new File(new TextEncoder().encode(read("./lib/email/_policybase.py")))],
                ["_parseaddr.py", new File(new TextEncoder().encode(read("./lib/email/_parseaddr.py")))],
                ["iterators.py", new File(new TextEncoder().encode(read("./lib/email/iterators.py")))],
                ["encoders.py", new File(new TextEncoder().encode(read("./lib/email/encoders.py")))],
                ])],
                ["antigravity.py", new File(new TextEncoder().encode(read("./lib/antigravity.py")))],
                ["_pylong.py", new File(new TextEncoder().encode(read("./lib/_pylong.py")))],
                ["_pydecimal.py", new File(new TextEncoder().encode(read("./lib/_pydecimal.py")))],
                ["poplib.py", new File(new TextEncoder().encode(read("./lib/poplib.py")))],
                ["_collections_abc.py", new File(new TextEncoder().encode(read("./lib/_collections_abc.py")))],
                ["bz2.py", new File(new TextEncoder().encode(read("./lib/bz2.py")))],
                ["glob.py", new File(new TextEncoder().encode(read("./lib/glob.py")))],
                ["pty.py", new File(new TextEncoder().encode(read("./lib/pty.py")))],
                ["io.py", new File(new TextEncoder().encode(read("./lib/io.py")))],
                ["decimal.py", new File(new TextEncoder().encode(read("./lib/decimal.py")))],
                ["selectors.py", new File(new TextEncoder().encode(read("./lib/selectors.py")))],
                ["tempfile.py", new File(new TextEncoder().encode(read("./lib/tempfile.py")))],
                ["shelve.py", new File(new TextEncoder().encode(read("./lib/shelve.py")))],
                ["linecache.py", new File(new TextEncoder().encode(read("./lib/linecache.py")))],
                ["pprint.py", new File(new TextEncoder().encode(read("./lib/pprint.py")))],
                ["sre_compile.py", new File(new TextEncoder().encode(read("./lib/sre_compile.py")))],
                ["encodings", new Directory([
                ["ptcp154.py", new File(new TextEncoder().encode(read("./lib/encodings/ptcp154.py")))],
                ["cp775.py", new File(new TextEncoder().encode(read("./lib/encodings/cp775.py")))],
                ["iso8859_2.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_2.py")))],
                ["bz2_codec.py", new File(new TextEncoder().encode(read("./lib/encodings/bz2_codec.py")))],
                ["gb18030.py", new File(new TextEncoder().encode(read("./lib/encodings/gb18030.py")))],
                ["cp720.py", new File(new TextEncoder().encode(read("./lib/encodings/cp720.py")))],
                ["iso8859_11.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_11.py")))],
                ["utf_16_be.py", new File(new TextEncoder().encode(read("./lib/encodings/utf_16_be.py")))],
                ["unicode_escape.py", new File(new TextEncoder().encode(read("./lib/encodings/unicode_escape.py")))],
                ["mac_romanian.py", new File(new TextEncoder().encode(read("./lib/encodings/mac_romanian.py")))],
                ["shift_jisx0213.py", new File(new TextEncoder().encode(read("./lib/encodings/shift_jisx0213.py")))],
                ["idna.py", new File(new TextEncoder().encode(read("./lib/encodings/idna.py")))],
                ["johab.py", new File(new TextEncoder().encode(read("./lib/encodings/johab.py")))],
                ["base64_codec.py", new File(new TextEncoder().encode(read("./lib/encodings/base64_codec.py")))],
                ["mac_croatian.py", new File(new TextEncoder().encode(read("./lib/encodings/mac_croatian.py")))],
                ["cp437.py", new File(new TextEncoder().encode(read("./lib/encodings/cp437.py")))],
                ["gb2312.py", new File(new TextEncoder().encode(read("./lib/encodings/gb2312.py")))],
                ["mac_latin2.py", new File(new TextEncoder().encode(read("./lib/encodings/mac_latin2.py")))],
                ["hp_roman8.py", new File(new TextEncoder().encode(read("./lib/encodings/hp_roman8.py")))],
                ["utf_8_sig.py", new File(new TextEncoder().encode(read("./lib/encodings/utf_8_sig.py")))],
                ["cp424.py", new File(new TextEncoder().encode(read("./lib/encodings/cp424.py")))],
                ["mac_turkish.py", new File(new TextEncoder().encode(read("./lib/encodings/mac_turkish.py")))],
                ["cp1256.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1256.py")))],
                ["aliases.py", new File(new TextEncoder().encode(read("./lib/encodings/aliases.py")))],
                ["cp875.py", new File(new TextEncoder().encode(read("./lib/encodings/cp875.py")))],
                ["utf_16.py", new File(new TextEncoder().encode(read("./lib/encodings/utf_16.py")))],
                ["cp932.py", new File(new TextEncoder().encode(read("./lib/encodings/cp932.py")))],
                ["latin_1.py", new File(new TextEncoder().encode(read("./lib/encodings/latin_1.py")))],
                ["hex_codec.py", new File(new TextEncoder().encode(read("./lib/encodings/hex_codec.py")))],
                ["cp1125.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1125.py")))],
                ["charmap.py", new File(new TextEncoder().encode(read("./lib/encodings/charmap.py")))],
                ["mbcs.py", new File(new TextEncoder().encode(read("./lib/encodings/mbcs.py")))],
                ["big5hkscs.py", new File(new TextEncoder().encode(read("./lib/encodings/big5hkscs.py")))],
                ["utf_8.py", new File(new TextEncoder().encode(read("./lib/encodings/utf_8.py")))],
                ["euc_kr.py", new File(new TextEncoder().encode(read("./lib/encodings/euc_kr.py")))],
                ["cp1250.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1250.py")))],
                ["cp273.py", new File(new TextEncoder().encode(read("./lib/encodings/cp273.py")))],
                ["cp858.py", new File(new TextEncoder().encode(read("./lib/encodings/cp858.py")))],
                ["cp855.py", new File(new TextEncoder().encode(read("./lib/encodings/cp855.py")))],
                ["iso8859_7.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_7.py")))],
                ["kz1048.py", new File(new TextEncoder().encode(read("./lib/encodings/kz1048.py")))],
                ["mac_greek.py", new File(new TextEncoder().encode(read("./lib/encodings/mac_greek.py")))],
                ["__pycache__", new Directory([
                ["utf_8.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/encodings/__pycache__/utf_8.cpython-313.pyc")))],
                ["ascii.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/encodings/__pycache__/ascii.cpython-313.pyc")))],
                ["latin_1.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/encodings/__pycache__/latin_1.cpython-313.pyc")))],
                ["aliases.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/encodings/__pycache__/aliases.cpython-313.pyc")))],
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/encodings/__pycache__/__init__.cpython-313.pyc")))],
                ])],
                ["cp1026.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1026.py")))],
                ["uu_codec.py", new File(new TextEncoder().encode(read("./lib/encodings/uu_codec.py")))],
                ["mac_cyrillic.py", new File(new TextEncoder().encode(read("./lib/encodings/mac_cyrillic.py")))],
                ["iso2022_jp.py", new File(new TextEncoder().encode(read("./lib/encodings/iso2022_jp.py")))],
                ["zlib_codec.py", new File(new TextEncoder().encode(read("./lib/encodings/zlib_codec.py")))],
                ["cp857.py", new File(new TextEncoder().encode(read("./lib/encodings/cp857.py")))],
                ["cp862.py", new File(new TextEncoder().encode(read("./lib/encodings/cp862.py")))],
                ["mac_roman.py", new File(new TextEncoder().encode(read("./lib/encodings/mac_roman.py")))],
                ["cp737.py", new File(new TextEncoder().encode(read("./lib/encodings/cp737.py")))],
                ["cp861.py", new File(new TextEncoder().encode(read("./lib/encodings/cp861.py")))],
                ["cp864.py", new File(new TextEncoder().encode(read("./lib/encodings/cp864.py")))],
                ["euc_jp.py", new File(new TextEncoder().encode(read("./lib/encodings/euc_jp.py")))],
                ["koi8_u.py", new File(new TextEncoder().encode(read("./lib/encodings/koi8_u.py")))],
                ["big5.py", new File(new TextEncoder().encode(read("./lib/encodings/big5.py")))],
                ["iso8859_6.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_6.py")))],
                ["iso8859_9.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_9.py")))],
                ["undefined.py", new File(new TextEncoder().encode(read("./lib/encodings/undefined.py")))],
                ["shift_jis.py", new File(new TextEncoder().encode(read("./lib/encodings/shift_jis.py")))],
                ["cp037.py", new File(new TextEncoder().encode(read("./lib/encodings/cp037.py")))],
                ["iso8859_16.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_16.py")))],
                ["iso8859_4.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_4.py")))],
                ["iso2022_jp_2004.py", new File(new TextEncoder().encode(read("./lib/encodings/iso2022_jp_2004.py")))],
                ["raw_unicode_escape.py", new File(new TextEncoder().encode(read("./lib/encodings/raw_unicode_escape.py")))],
                ["cp1006.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1006.py")))],
                ["cp950.py", new File(new TextEncoder().encode(read("./lib/encodings/cp950.py")))],
                ["cp1254.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1254.py")))],
                ["cp856.py", new File(new TextEncoder().encode(read("./lib/encodings/cp856.py")))],
                ["cp860.py", new File(new TextEncoder().encode(read("./lib/encodings/cp860.py")))],
                ["iso8859_13.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_13.py")))],
                ["cp1255.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1255.py")))],
                ["hz.py", new File(new TextEncoder().encode(read("./lib/encodings/hz.py")))],
                ["utf_32_le.py", new File(new TextEncoder().encode(read("./lib/encodings/utf_32_le.py")))],
                ["cp850.py", new File(new TextEncoder().encode(read("./lib/encodings/cp850.py")))],
                ["cp863.py", new File(new TextEncoder().encode(read("./lib/encodings/cp863.py")))],
                ["iso8859_14.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_14.py")))],
                ["iso8859_5.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_5.py")))],
                ["euc_jis_2004.py", new File(new TextEncoder().encode(read("./lib/encodings/euc_jis_2004.py")))],
                ["cp949.py", new File(new TextEncoder().encode(read("./lib/encodings/cp949.py")))],
                ["shift_jis_2004.py", new File(new TextEncoder().encode(read("./lib/encodings/shift_jis_2004.py")))],
                ["cp852.py", new File(new TextEncoder().encode(read("./lib/encodings/cp852.py")))],
                ["iso8859_3.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_3.py")))],
                ["cp865.py", new File(new TextEncoder().encode(read("./lib/encodings/cp865.py")))],
                ["utf_7.py", new File(new TextEncoder().encode(read("./lib/encodings/utf_7.py")))],
                ["cp1257.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1257.py")))],
                ["palmos.py", new File(new TextEncoder().encode(read("./lib/encodings/palmos.py")))],
                ["cp1251.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1251.py")))],
                ["utf_16_le.py", new File(new TextEncoder().encode(read("./lib/encodings/utf_16_le.py")))],
                ["oem.py", new File(new TextEncoder().encode(read("./lib/encodings/oem.py")))],
                ["iso8859_10.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_10.py")))],
                ["cp500.py", new File(new TextEncoder().encode(read("./lib/encodings/cp500.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/encodings/__init__.py")))],
                ["cp1253.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1253.py")))],
                ["iso8859_8.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_8.py")))],
                ["ascii.py", new File(new TextEncoder().encode(read("./lib/encodings/ascii.py")))],
                ["gbk.py", new File(new TextEncoder().encode(read("./lib/encodings/gbk.py")))],
                ["mac_iceland.py", new File(new TextEncoder().encode(read("./lib/encodings/mac_iceland.py")))],
                ["iso8859_15.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_15.py")))],
                ["cp869.py", new File(new TextEncoder().encode(read("./lib/encodings/cp869.py")))],
                ["mac_farsi.py", new File(new TextEncoder().encode(read("./lib/encodings/mac_farsi.py")))],
                ["cp1252.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1252.py")))],
                ["iso2022_jp_ext.py", new File(new TextEncoder().encode(read("./lib/encodings/iso2022_jp_ext.py")))],
                ["utf_32.py", new File(new TextEncoder().encode(read("./lib/encodings/utf_32.py")))],
                ["cp866.py", new File(new TextEncoder().encode(read("./lib/encodings/cp866.py")))],
                ["utf_32_be.py", new File(new TextEncoder().encode(read("./lib/encodings/utf_32_be.py")))],
                ["euc_jisx0213.py", new File(new TextEncoder().encode(read("./lib/encodings/euc_jisx0213.py")))],
                ["punycode.py", new File(new TextEncoder().encode(read("./lib/encodings/punycode.py")))],
                ["quopri_codec.py", new File(new TextEncoder().encode(read("./lib/encodings/quopri_codec.py")))],
                ["koi8_t.py", new File(new TextEncoder().encode(read("./lib/encodings/koi8_t.py")))],
                ["iso8859_1.py", new File(new TextEncoder().encode(read("./lib/encodings/iso8859_1.py")))],
                ["iso2022_jp_3.py", new File(new TextEncoder().encode(read("./lib/encodings/iso2022_jp_3.py")))],
                ["cp874.py", new File(new TextEncoder().encode(read("./lib/encodings/cp874.py")))],
                ["iso2022_jp_1.py", new File(new TextEncoder().encode(read("./lib/encodings/iso2022_jp_1.py")))],
                ["cp1258.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1258.py")))],
                ["cp1140.py", new File(new TextEncoder().encode(read("./lib/encodings/cp1140.py")))],
                ["iso2022_kr.py", new File(new TextEncoder().encode(read("./lib/encodings/iso2022_kr.py")))],
                ["tis_620.py", new File(new TextEncoder().encode(read("./lib/encodings/tis_620.py")))],
                ["iso2022_jp_2.py", new File(new TextEncoder().encode(read("./lib/encodings/iso2022_jp_2.py")))],
                ["rot_13.py", new File(new TextEncoder().encode(read("./lib/encodings/rot_13.py")))],
                ["mac_arabic.py", new File(new TextEncoder().encode(read("./lib/encodings/mac_arabic.py")))],
                ["koi8_r.py", new File(new TextEncoder().encode(read("./lib/encodings/koi8_r.py")))],
                ])],
                ["zipimport.py", new File(new TextEncoder().encode(read("./lib/zipimport.py")))],
                ["pydoc.py", new File(new TextEncoder().encode(read("./lib/pydoc.py")))],
                ["concurrent", new Directory([
                ["futures", new Directory([
                ["process.py", new File(new TextEncoder().encode(read("./lib/concurrent/futures/process.py")))],
                ["_base.py", new File(new TextEncoder().encode(read("./lib/concurrent/futures/_base.py")))],
                ["__pycache__", new Directory([
                ["_base.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/concurrent/futures/__pycache__/_base.cpython-313.pyc")))],
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/concurrent/futures/__pycache__/__init__.cpython-313.pyc")))],
                ])],
                ["thread.py", new File(new TextEncoder().encode(read("./lib/concurrent/futures/thread.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/concurrent/futures/__init__.py")))],
                ])],
                ["__pycache__", new Directory([
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/concurrent/__pycache__/__init__.cpython-313.pyc")))],
                ])],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/concurrent/__init__.py")))],
                ])],
                ["csv.py", new File(new TextEncoder().encode(read("./lib/csv.py")))],
                ["heapq.py", new File(new TextEncoder().encode(read("./lib/heapq.py")))],
                ["sysconfig", new Directory([
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/sysconfig/__main__.py")))],
                ["__pycache__", new Directory([
                ["__main__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/sysconfig/__pycache__/__main__.cpython-313.pyc")))],
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/sysconfig/__pycache__/__init__.cpython-313.pyc")))],
                ])],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/sysconfig/__init__.py")))],
                ])],
                ["getopt.py", new File(new TextEncoder().encode(read("./lib/getopt.py")))],
                ["curses", new Directory([
                ["panel.py", new File(new TextEncoder().encode(read("./lib/curses/panel.py")))],
                ["textpad.py", new File(new TextEncoder().encode(read("./lib/curses/textpad.py")))],
                ["has_key.py", new File(new TextEncoder().encode(read("./lib/curses/has_key.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/curses/__init__.py")))],
                ["ascii.py", new File(new TextEncoder().encode(read("./lib/curses/ascii.py")))],
                ])],
                ["calendar.py", new File(new TextEncoder().encode(read("./lib/calendar.py")))],
                ["_strptime.py", new File(new TextEncoder().encode(read("./lib/_strptime.py")))],
                ["idlelib", new Directory([
                ["idle.pyw", new File(new TextEncoder().encode(read("./lib/idlelib/idle.pyw")))],
                ["window.py", new File(new TextEncoder().encode(read("./lib/idlelib/window.py")))],
                ["parenmatch.py", new File(new TextEncoder().encode(read("./lib/idlelib/parenmatch.py")))],
                ["mainmenu.py", new File(new TextEncoder().encode(read("./lib/idlelib/mainmenu.py")))],
                ["README.txt", new File(new TextEncoder().encode(read("./lib/idlelib/README.txt")))],
                ["delegator.py", new File(new TextEncoder().encode(read("./lib/idlelib/delegator.py")))],
                ["percolator.py", new File(new TextEncoder().encode(read("./lib/idlelib/percolator.py")))],
                ["searchengine.py", new File(new TextEncoder().encode(read("./lib/idlelib/searchengine.py")))],
                ["tooltip.py", new File(new TextEncoder().encode(read("./lib/idlelib/tooltip.py")))],
                ["scrolledlist.py", new File(new TextEncoder().encode(read("./lib/idlelib/scrolledlist.py")))],
                ["NEWS2x.txt", new File(new TextEncoder().encode(read("./lib/idlelib/NEWS2x.txt")))],
                ["idle.bat", new File(new TextEncoder().encode(read("./lib/idlelib/idle.bat")))],
                ["config_key.py", new File(new TextEncoder().encode(read("./lib/idlelib/config_key.py")))],
                ["idle_test", new Directory([
                ["test_config_key.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_config_key.py")))],
                ["test_statusbar.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_statusbar.py")))],
                ["test_hyperparser.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_hyperparser.py")))],
                ["test_help_about.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_help_about.py")))],
                ["README.txt", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/README.txt")))],
                ["test_text.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_text.py")))],
                ["test_util.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_util.py")))],
                ["test_scrolledlist.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_scrolledlist.py")))],
                ["test_runscript.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_runscript.py")))],
                ["test_help.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_help.py")))],
                ["test_format.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_format.py")))],
                ["test_history.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_history.py")))],
                ["test_debugobj.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_debugobj.py")))],
                ["test_delegator.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_delegator.py")))],
                ["test_debugger.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_debugger.py")))],
                ["test_run.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_run.py")))],
                ["test_filelist.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_filelist.py")))],
                ["test_autoexpand.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_autoexpand.py")))],
                ["test_pyparse.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_pyparse.py")))],
                ["htest.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/htest.py")))],
                ["test_debugger_r.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_debugger_r.py")))],
                ["test_configdialog.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_configdialog.py")))],
                ["test_iomenu.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_iomenu.py")))],
                ["test_tooltip.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_tooltip.py")))],
                ["test_codecontext.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_codecontext.py")))],
                ["test_stackviewer.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_stackviewer.py")))],
                ["test_pyshell.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_pyshell.py")))],
                ["example_noext", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/example_noext")))],
                ["test_sidebar.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_sidebar.py")))],
                ["test_replace.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_replace.py")))],
                ["mock_tk.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/mock_tk.py")))],
                ["test_search.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_search.py")))],
                ["test_multicall.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_multicall.py")))],
                ["test_pathbrowser.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_pathbrowser.py")))],
                ["test_percolator.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_percolator.py")))],
                ["test_undo.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_undo.py")))],
                ["test_query.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_query.py")))],
                ["test_tree.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_tree.py")))],
                ["test_rpc.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_rpc.py")))],
                ["template.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/template.py")))],
                ["test_colorizer.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_colorizer.py")))],
                ["test_warning.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_warning.py")))],
                ["test_debugobj_r.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_debugobj_r.py")))],
                ["mock_idle.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/mock_idle.py")))],
                ["test_zoomheight.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_zoomheight.py")))],
                ["test_browser.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_browser.py")))],
                ["test_zzdummy.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_zzdummy.py")))],
                ["test_config.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_config.py")))],
                ["test_textview.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_textview.py")))],
                ["test_outwin.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_outwin.py")))],
                ["test_calltip_w.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_calltip_w.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/__init__.py")))],
                ["tkinter_testing_utils.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/tkinter_testing_utils.py")))],
                ["test_grep.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_grep.py")))],
                ["test_macosx.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_macosx.py")))],
                ["test_calltip.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_calltip.py")))],
                ["test_squeezer.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_squeezer.py")))],
                ["test_autocomplete.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_autocomplete.py")))],
                ["test_editmenu.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_editmenu.py")))],
                ["test_redirector.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_redirector.py")))],
                ["test_autocomplete_w.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_autocomplete_w.py")))],
                ["test_searchbase.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_searchbase.py")))],
                ["test_parenmatch.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_parenmatch.py")))],
                ["test_searchengine.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_searchengine.py")))],
                ["test_mainmenu.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_mainmenu.py")))],
                ["test_editor.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_editor.py")))],
                ["example_stub.pyi", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/example_stub.pyi")))],
                ["test_window.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle_test/test_window.py")))],
                ])],
                ["filelist.py", new File(new TextEncoder().encode(read("./lib/idlelib/filelist.py")))],
                ["tree.py", new File(new TextEncoder().encode(read("./lib/idlelib/tree.py")))],
                ["squeezer.py", new File(new TextEncoder().encode(read("./lib/idlelib/squeezer.py")))],
                ["zoomheight.py", new File(new TextEncoder().encode(read("./lib/idlelib/zoomheight.py")))],
                ["CREDITS.txt", new File(new TextEncoder().encode(read("./lib/idlelib/CREDITS.txt")))],
                ["help_about.py", new File(new TextEncoder().encode(read("./lib/idlelib/help_about.py")))],
                ["grep.py", new File(new TextEncoder().encode(read("./lib/idlelib/grep.py")))],
                ["replace.py", new File(new TextEncoder().encode(read("./lib/idlelib/replace.py")))],
                ["pathbrowser.py", new File(new TextEncoder().encode(read("./lib/idlelib/pathbrowser.py")))],
                ["format.py", new File(new TextEncoder().encode(read("./lib/idlelib/format.py")))],
                ["colorizer.py", new File(new TextEncoder().encode(read("./lib/idlelib/colorizer.py")))],
                ["config-main.def", new File(new TextEncoder().encode(read("./lib/idlelib/config-main.def")))],
                ["pyparse.py", new File(new TextEncoder().encode(read("./lib/idlelib/pyparse.py")))],
                ["News3.txt", new File(new TextEncoder().encode(read("./lib/idlelib/News3.txt")))],
                ["idle.py", new File(new TextEncoder().encode(read("./lib/idlelib/idle.py")))],
                ["help.py", new File(new TextEncoder().encode(read("./lib/idlelib/help.py")))],
                ["extend.txt", new File(new TextEncoder().encode(read("./lib/idlelib/extend.txt")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/idlelib/__main__.py")))],
                ["zzdummy.py", new File(new TextEncoder().encode(read("./lib/idlelib/zzdummy.py")))],
                ["pyshell.py", new File(new TextEncoder().encode(read("./lib/idlelib/pyshell.py")))],
                ["macosx.py", new File(new TextEncoder().encode(read("./lib/idlelib/macosx.py")))],
                ["debugobj_r.py", new File(new TextEncoder().encode(read("./lib/idlelib/debugobj_r.py")))],
                ["help.html", new File(new TextEncoder().encode(read("./lib/idlelib/help.html")))],
                ["undo.py", new File(new TextEncoder().encode(read("./lib/idlelib/undo.py")))],
                ["rpc.py", new File(new TextEncoder().encode(read("./lib/idlelib/rpc.py")))],
                ["config-highlight.def", new File(new TextEncoder().encode(read("./lib/idlelib/config-highlight.def")))],
                ["debugobj.py", new File(new TextEncoder().encode(read("./lib/idlelib/debugobj.py")))],
                ["search.py", new File(new TextEncoder().encode(read("./lib/idlelib/search.py")))],
                ["sidebar.py", new File(new TextEncoder().encode(read("./lib/idlelib/sidebar.py")))],
                ["config-extensions.def", new File(new TextEncoder().encode(read("./lib/idlelib/config-extensions.def")))],
                ["debugger.py", new File(new TextEncoder().encode(read("./lib/idlelib/debugger.py")))],
                ["query.py", new File(new TextEncoder().encode(read("./lib/idlelib/query.py")))],
                ["textview.py", new File(new TextEncoder().encode(read("./lib/idlelib/textview.py")))],
                ["config-keys.def", new File(new TextEncoder().encode(read("./lib/idlelib/config-keys.def")))],
                ["autocomplete.py", new File(new TextEncoder().encode(read("./lib/idlelib/autocomplete.py")))],
                ["HISTORY.txt", new File(new TextEncoder().encode(read("./lib/idlelib/HISTORY.txt")))],
                ["TODO.txt", new File(new TextEncoder().encode(read("./lib/idlelib/TODO.txt")))],
                ["statusbar.py", new File(new TextEncoder().encode(read("./lib/idlelib/statusbar.py")))],
                ["hyperparser.py", new File(new TextEncoder().encode(read("./lib/idlelib/hyperparser.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/idlelib/__init__.py")))],
                ["searchbase.py", new File(new TextEncoder().encode(read("./lib/idlelib/searchbase.py")))],
                ["configdialog.py", new File(new TextEncoder().encode(read("./lib/idlelib/configdialog.py")))],
                ["codecontext.py", new File(new TextEncoder().encode(read("./lib/idlelib/codecontext.py")))],
                ["iomenu.py", new File(new TextEncoder().encode(read("./lib/idlelib/iomenu.py")))],
                ["stackviewer.py", new File(new TextEncoder().encode(read("./lib/idlelib/stackviewer.py")))],
                ["browser.py", new File(new TextEncoder().encode(read("./lib/idlelib/browser.py")))],
                ["calltip_w.py", new File(new TextEncoder().encode(read("./lib/idlelib/calltip_w.py")))],
                ["util.py", new File(new TextEncoder().encode(read("./lib/idlelib/util.py")))],
                ["outwin.py", new File(new TextEncoder().encode(read("./lib/idlelib/outwin.py")))],
                ["multicall.py", new File(new TextEncoder().encode(read("./lib/idlelib/multicall.py")))],
                ["Icons", new Directory([
                ["idle_256.png", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/idle_256.png")))],
                ["README.txt", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/README.txt")))],
                ["tk.gif", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/tk.gif")))],
                ["idle.ico", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/idle.ico")))],
                ["openfolder.gif", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/openfolder.gif")))],
                ["python.gif", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/python.gif")))],
                ["idle_48.gif", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/idle_48.gif")))],
                ["idle_32.gif", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/idle_32.gif")))],
                ["minusnode.gif", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/minusnode.gif")))],
                ["folder.gif", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/folder.gif")))],
                ["plusnode.gif", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/plusnode.gif")))],
                ["idle_16.gif", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/idle_16.gif")))],
                ["idle_48.png", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/idle_48.png")))],
                ["idle_32.png", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/idle_32.png")))],
                ["idle_16.png", new File(new TextEncoder().encode(read("./lib/idlelib/Icons/idle_16.png")))],
                ])],
                ["config.py", new File(new TextEncoder().encode(read("./lib/idlelib/config.py")))],
                ["editor.py", new File(new TextEncoder().encode(read("./lib/idlelib/editor.py")))],
                ["debugger_r.py", new File(new TextEncoder().encode(read("./lib/idlelib/debugger_r.py")))],
                ["ChangeLog", new File(new TextEncoder().encode(read("./lib/idlelib/ChangeLog")))],
                ["calltip.py", new File(new TextEncoder().encode(read("./lib/idlelib/calltip.py")))],
                ["run.py", new File(new TextEncoder().encode(read("./lib/idlelib/run.py")))],
                ["autocomplete_w.py", new File(new TextEncoder().encode(read("./lib/idlelib/autocomplete_w.py")))],
                ["history.py", new File(new TextEncoder().encode(read("./lib/idlelib/history.py")))],
                ["autoexpand.py", new File(new TextEncoder().encode(read("./lib/idlelib/autoexpand.py")))],
                ["redirector.py", new File(new TextEncoder().encode(read("./lib/idlelib/redirector.py")))],
                ["runscript.py", new File(new TextEncoder().encode(read("./lib/idlelib/runscript.py")))],
                ["dynoption.py", new File(new TextEncoder().encode(read("./lib/idlelib/dynoption.py")))],
                ])],
                ["codecs.py", new File(new TextEncoder().encode(read("./lib/codecs.py")))],
                ["cProfile.py", new File(new TextEncoder().encode(read("./lib/cProfile.py")))],
                ["tracemalloc.py", new File(new TextEncoder().encode(read("./lib/tracemalloc.py")))],
                ["argparse.py", new File(new TextEncoder().encode(read("./lib/argparse.py")))],
                ["xml", new Directory([
                ["__pycache__", new Directory([
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/xml/__pycache__/__init__.cpython-313.pyc")))],
                ])],
                ["sax", new Directory([
                ["xmlreader.py", new File(new TextEncoder().encode(read("./lib/xml/sax/xmlreader.py")))],
                ["_exceptions.py", new File(new TextEncoder().encode(read("./lib/xml/sax/_exceptions.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/xml/sax/__init__.py")))],
                ["expatreader.py", new File(new TextEncoder().encode(read("./lib/xml/sax/expatreader.py")))],
                ["saxutils.py", new File(new TextEncoder().encode(read("./lib/xml/sax/saxutils.py")))],
                ["handler.py", new File(new TextEncoder().encode(read("./lib/xml/sax/handler.py")))],
                ])],
                ["etree", new Directory([
                ["cElementTree.py", new File(new TextEncoder().encode(read("./lib/xml/etree/cElementTree.py")))],
                ["ElementInclude.py", new File(new TextEncoder().encode(read("./lib/xml/etree/ElementInclude.py")))],
                ["__pycache__", new Directory([
                ["ElementPath.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/xml/etree/__pycache__/ElementPath.cpython-313.pyc")))],
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/xml/etree/__pycache__/__init__.cpython-313.pyc")))],
                ])],
                ["ElementTree.py", new File(new TextEncoder().encode(read("./lib/xml/etree/ElementTree.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/xml/etree/__init__.py")))],
                ["ElementPath.py", new File(new TextEncoder().encode(read("./lib/xml/etree/ElementPath.py")))],
                ])],
                ["dom", new Directory([
                ["domreg.py", new File(new TextEncoder().encode(read("./lib/xml/dom/domreg.py")))],
                ["minidom.py", new File(new TextEncoder().encode(read("./lib/xml/dom/minidom.py")))],
                ["NodeFilter.py", new File(new TextEncoder().encode(read("./lib/xml/dom/NodeFilter.py")))],
                ["pulldom.py", new File(new TextEncoder().encode(read("./lib/xml/dom/pulldom.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/xml/dom/__init__.py")))],
                ["xmlbuilder.py", new File(new TextEncoder().encode(read("./lib/xml/dom/xmlbuilder.py")))],
                ["expatbuilder.py", new File(new TextEncoder().encode(read("./lib/xml/dom/expatbuilder.py")))],
                ["minicompat.py", new File(new TextEncoder().encode(read("./lib/xml/dom/minicompat.py")))],
                ])],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/xml/__init__.py")))],
                ["parsers", new Directory([
                ["expat.py", new File(new TextEncoder().encode(read("./lib/xml/parsers/expat.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/xml/parsers/__init__.py")))],
                ])],
                ])],
                ["zipfile", new Directory([
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/zipfile/__main__.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/zipfile/__init__.py")))],
                ["_path", new Directory([
                ["glob.py", new File(new TextEncoder().encode(read("./lib/zipfile/_path/glob.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/zipfile/_path/__init__.py")))],
                ])],
                ])],
                ["copy.py", new File(new TextEncoder().encode(read("./lib/copy.py")))],
                ["runpy.py", new File(new TextEncoder().encode(read("./lib/runpy.py")))],
                ["mimetypes.py", new File(new TextEncoder().encode(read("./lib/mimetypes.py")))],
                ["ensurepip", new Directory([
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/ensurepip/__main__.py")))],
                ["_bundled", new Directory([
                ["pip-24.0-py3-none-any.whl", new File(new TextEncoder().encode(read("./lib/ensurepip/_bundled/pip-24.0-py3-none-any.whl")))],
                ])],
                ["_uninstall.py", new File(new TextEncoder().encode(read("./lib/ensurepip/_uninstall.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/ensurepip/__init__.py")))],
                ])],
                ["bdb.py", new File(new TextEncoder().encode(read("./lib/bdb.py")))],
                ["configparser.py", new File(new TextEncoder().encode(read("./lib/configparser.py")))],
                ["__future__.py", new File(new TextEncoder().encode(read("./lib/__future__.py")))],
                ["tty.py", new File(new TextEncoder().encode(read("./lib/tty.py")))],
                ["_sitebuiltins.py", new File(new TextEncoder().encode(read("./lib/_sitebuiltins.py")))],
                ["shlex.py", new File(new TextEncoder().encode(read("./lib/shlex.py")))],
                ["hmac.py", new File(new TextEncoder().encode(read("./lib/hmac.py")))],
                ["__pycache__", new Directory([
                ["weakref.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/weakref.cpython-313.pyc")))],
                ["_compat_pickle.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/_compat_pickle.cpython-313.pyc")))],
                ["reprlib.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/reprlib.cpython-313.pyc")))],
                ["codecs.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/codecs.cpython-313.pyc")))],
                ["glob.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/glob.cpython-313.pyc")))],
                ["_opcode_metadata.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/_opcode_metadata.cpython-313.pyc")))],
                ["types.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/types.cpython-313.pyc")))],
                ["traceback.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/traceback.cpython-313.pyc")))],
                ["signal.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/signal.cpython-313.pyc")))],
                ["_sitebuiltins.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/_sitebuiltins.cpython-313.pyc")))],
                ["socket.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/socket.cpython-313.pyc")))],
                ["_collections_abc.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/_collections_abc.cpython-313.pyc")))],
                ["_compression.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/_compression.cpython-313.pyc")))],
                ["typing.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/typing.cpython-313.pyc")))],
                ["site.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/site.cpython-313.pyc")))],
                ["dis.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/dis.cpython-313.pyc")))],
                ["copyreg.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/copyreg.cpython-313.pyc")))],
                ["ntpath.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/ntpath.cpython-313.pyc")))],
                ["gettext.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/gettext.cpython-313.pyc")))],
                ["base64.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/base64.cpython-313.pyc")))],
                ["string.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/string.cpython-313.pyc")))],
                ["ssl.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/ssl.cpython-313.pyc")))],
                ["textwrap.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/textwrap.cpython-313.pyc")))],
                ["ast.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/ast.cpython-313.pyc")))],
                ["contextvars.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/contextvars.cpython-313.pyc")))],
                ["copy.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/copy.cpython-313.pyc")))],
                ["operator.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/operator.cpython-313.pyc")))],
                ["stat.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/stat.cpython-313.pyc")))],
                ["selectors.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/selectors.cpython-313.pyc")))],
                ["io.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/io.cpython-313.pyc")))],
                ["_weakrefset.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/_weakrefset.cpython-313.pyc")))],
                ["fnmatch.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/fnmatch.cpython-313.pyc")))],
                ["lzma.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/lzma.cpython-313.pyc")))],
                ["bz2.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/bz2.cpython-313.pyc")))],
                ["locale.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/locale.cpython-313.pyc")))],
                ["linecache.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/linecache.cpython-313.pyc")))],
                ["runpy.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/runpy.cpython-313.pyc")))],
                ["shutil.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/shutil.cpython-313.pyc")))],
                ["inspect.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/inspect.cpython-313.pyc")))],
                ["keyword.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/keyword.cpython-313.pyc")))],
                ["argparse.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/argparse.cpython-313.pyc")))],
                ["datetime.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/datetime.cpython-313.pyc")))],
                ["enum.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/enum.cpython-313.pyc")))],
                ["subprocess.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/subprocess.cpython-313.pyc")))],
                ["contextlib.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/contextlib.cpython-313.pyc")))],
                ["opcode.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/opcode.cpython-313.pyc")))],
                ["threading.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/threading.cpython-313.pyc")))],
                ["numbers.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/numbers.cpython-313.pyc")))],
                ["posixpath.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/posixpath.cpython-313.pyc")))],
                ["warnings.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/warnings.cpython-313.pyc")))],
                ["heapq.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/heapq.cpython-313.pyc")))],
                ["os.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/os.cpython-313.pyc")))],
                ["abc.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/abc.cpython-313.pyc")))],
                ["functools.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/functools.cpython-313.pyc")))],
                ["struct.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/struct.cpython-313.pyc")))],
                ["token.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/token.cpython-313.pyc")))],
                ["genericpath.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/genericpath.cpython-313.pyc")))],
                ["tokenize.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/tokenize.cpython-313.pyc")))],
                ["rlcompleter.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/__pycache__/rlcompleter.cpython-313.pyc")))],
                ])],
                ["os.py", new File(new TextEncoder().encode(read("./lib/os.py")))],
                ["pyclbr.py", new File(new TextEncoder().encode(read("./lib/pyclbr.py")))],
                ["secrets.py", new File(new TextEncoder().encode(read("./lib/secrets.py")))],
                ["ntpath.py", new File(new TextEncoder().encode(read("./lib/ntpath.py")))],
                ["logging", new Directory([
                ["handlers.py", new File(new TextEncoder().encode(read("./lib/logging/handlers.py")))],
                ["__pycache__", new Directory([
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/logging/__pycache__/__init__.cpython-313.pyc")))],
                ])],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/logging/__init__.py")))],
                ["config.py", new File(new TextEncoder().encode(read("./lib/logging/config.py")))],
                ])],
                ["xmlrpc", new Directory([
                ["client.py", new File(new TextEncoder().encode(read("./lib/xmlrpc/client.py")))],
                ["server.py", new File(new TextEncoder().encode(read("./lib/xmlrpc/server.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/xmlrpc/__init__.py")))],
                ])],
                ["_pyio.py", new File(new TextEncoder().encode(read("./lib/_pyio.py")))],
                ["re", new Directory([
                ["_constants.py", new File(new TextEncoder().encode(read("./lib/re/_constants.py")))],
                ["_casefix.py", new File(new TextEncoder().encode(read("./lib/re/_casefix.py")))],
                ["__pycache__", new Directory([
                ["_casefix.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/re/__pycache__/_casefix.cpython-313.pyc")))],
                ["_parser.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/re/__pycache__/_parser.cpython-313.pyc")))],
                ["_compiler.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/re/__pycache__/_compiler.cpython-313.pyc")))],
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/re/__pycache__/__init__.cpython-313.pyc")))],
                ["_constants.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/re/__pycache__/_constants.cpython-313.pyc")))],
                ])],
                ["_parser.py", new File(new TextEncoder().encode(read("./lib/re/_parser.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/re/__init__.py")))],
                ["_compiler.py", new File(new TextEncoder().encode(read("./lib/re/_compiler.py")))],
                ])],
                ["keyword.py", new File(new TextEncoder().encode(read("./lib/keyword.py")))],
                ["platform.py", new File(new TextEncoder().encode(read("./lib/platform.py")))],
                ["stringprep.py", new File(new TextEncoder().encode(read("./lib/stringprep.py")))],
                ["queue.py", new File(new TextEncoder().encode(read("./lib/queue.py")))],
                ["smtplib.py", new File(new TextEncoder().encode(read("./lib/smtplib.py")))],
                ["gettext.py", new File(new TextEncoder().encode(read("./lib/gettext.py")))],
                ["wave.py", new File(new TextEncoder().encode(read("./lib/wave.py")))],
                ["_compression.py", new File(new TextEncoder().encode(read("./lib/_compression.py")))],
                ["locale.py", new File(new TextEncoder().encode(read("./lib/locale.py")))],
                ["difflib.py", new File(new TextEncoder().encode(read("./lib/difflib.py")))],
                ["webbrowser.py", new File(new TextEncoder().encode(read("./lib/webbrowser.py")))],
                ["asyncio", new Directory([
                ["queues.py", new File(new TextEncoder().encode(read("./lib/asyncio/queues.py")))],
                ["constants.py", new File(new TextEncoder().encode(read("./lib/asyncio/constants.py")))],
                ["trsock.py", new File(new TextEncoder().encode(read("./lib/asyncio/trsock.py")))],
                ["mixins.py", new File(new TextEncoder().encode(read("./lib/asyncio/mixins.py")))],
                ["threads.py", new File(new TextEncoder().encode(read("./lib/asyncio/threads.py")))],
                ["windows_utils.py", new File(new TextEncoder().encode(read("./lib/asyncio/windows_utils.py")))],
                ["futures.py", new File(new TextEncoder().encode(read("./lib/asyncio/futures.py")))],
                ["locks.py", new File(new TextEncoder().encode(read("./lib/asyncio/locks.py")))],
                ["exceptions.py", new File(new TextEncoder().encode(read("./lib/asyncio/exceptions.py")))],
                ["staggered.py", new File(new TextEncoder().encode(read("./lib/asyncio/staggered.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/asyncio/__main__.py")))],
                ["events.py", new File(new TextEncoder().encode(read("./lib/asyncio/events.py")))],
                ["__pycache__", new Directory([
                ["coroutines.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/coroutines.cpython-313.pyc")))],
                ["runners.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/runners.cpython-313.pyc")))],
                ["events.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/events.cpython-313.pyc")))],
                ["mixins.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/mixins.cpython-313.pyc")))],
                ["base_events.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/base_events.cpython-313.pyc")))],
                ["taskgroups.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/taskgroups.cpython-313.pyc")))],
                ["format_helpers.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/format_helpers.cpython-313.pyc")))],
                ["log.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/log.cpython-313.pyc")))],
                ["sslproto.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/sslproto.cpython-313.pyc")))],
                ["queues.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/queues.cpython-313.pyc")))],
                ["locks.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/locks.cpython-313.pyc")))],
                ["base_tasks.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/base_tasks.cpython-313.pyc")))],
                ["trsock.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/trsock.cpython-313.pyc")))],
                ["exceptions.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/exceptions.cpython-313.pyc")))],
                ["threads.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/threads.cpython-313.pyc")))],
                ["timeouts.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/timeouts.cpython-313.pyc")))],
                ["streams.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/streams.cpython-313.pyc")))],
                ["base_futures.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/base_futures.cpython-313.pyc")))],
                ["staggered.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/staggered.cpython-313.pyc")))],
                ["constants.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/constants.cpython-313.pyc")))],
                ["tasks.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/tasks.cpython-313.pyc")))],
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/__init__.cpython-313.pyc")))],
                ["subprocess.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/subprocess.cpython-313.pyc")))],
                ["base_subprocess.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/base_subprocess.cpython-313.pyc")))],
                ["futures.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/futures.cpython-313.pyc")))],
                ["transports.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/transports.cpython-313.pyc")))],
                ["protocols.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/protocols.cpython-313.pyc")))],
                ["selector_events.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/selector_events.cpython-313.pyc")))],
                ["unix_events.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/asyncio/__pycache__/unix_events.cpython-313.pyc")))],
                ])],
                ["format_helpers.py", new File(new TextEncoder().encode(read("./lib/asyncio/format_helpers.py")))],
                ["streams.py", new File(new TextEncoder().encode(read("./lib/asyncio/streams.py")))],
                ["protocols.py", new File(new TextEncoder().encode(read("./lib/asyncio/protocols.py")))],
                ["selector_events.py", new File(new TextEncoder().encode(read("./lib/asyncio/selector_events.py")))],
                ["coroutines.py", new File(new TextEncoder().encode(read("./lib/asyncio/coroutines.py")))],
                ["base_futures.py", new File(new TextEncoder().encode(read("./lib/asyncio/base_futures.py")))],
                ["runners.py", new File(new TextEncoder().encode(read("./lib/asyncio/runners.py")))],
                ["transports.py", new File(new TextEncoder().encode(read("./lib/asyncio/transports.py")))],
                ["base_events.py", new File(new TextEncoder().encode(read("./lib/asyncio/base_events.py")))],
                ["tasks.py", new File(new TextEncoder().encode(read("./lib/asyncio/tasks.py")))],
                ["base_tasks.py", new File(new TextEncoder().encode(read("./lib/asyncio/base_tasks.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/asyncio/__init__.py")))],
                ["taskgroups.py", new File(new TextEncoder().encode(read("./lib/asyncio/taskgroups.py")))],
                ["subprocess.py", new File(new TextEncoder().encode(read("./lib/asyncio/subprocess.py")))],
                ["proactor_events.py", new File(new TextEncoder().encode(read("./lib/asyncio/proactor_events.py")))],
                ["log.py", new File(new TextEncoder().encode(read("./lib/asyncio/log.py")))],
                ["timeouts.py", new File(new TextEncoder().encode(read("./lib/asyncio/timeouts.py")))],
                ["windows_events.py", new File(new TextEncoder().encode(read("./lib/asyncio/windows_events.py")))],
                ["unix_events.py", new File(new TextEncoder().encode(read("./lib/asyncio/unix_events.py")))],
                ["base_subprocess.py", new File(new TextEncoder().encode(read("./lib/asyncio/base_subprocess.py")))],
                ["sslproto.py", new File(new TextEncoder().encode(read("./lib/asyncio/sslproto.py")))],
                ])],
                ["dis.py", new File(new TextEncoder().encode(read("./lib/dis.py")))],
                ["gzip.py", new File(new TextEncoder().encode(read("./lib/gzip.py")))],
                ["datetime.py", new File(new TextEncoder().encode(read("./lib/datetime.py")))],
                ["traceback.py", new File(new TextEncoder().encode(read("./lib/traceback.py")))],
                ["fractions.py", new File(new TextEncoder().encode(read("./lib/fractions.py")))],
                ["opcode.py", new File(new TextEncoder().encode(read("./lib/opcode.py")))],
                ["_threading_local.py", new File(new TextEncoder().encode(read("./lib/_threading_local.py")))],
                ["codeop.py", new File(new TextEncoder().encode(read("./lib/codeop.py")))],
                ["pathlib", new Directory([
                ["__pycache__", new Directory([
                ["_abc.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/pathlib/__pycache__/_abc.cpython-313.pyc")))],
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/pathlib/__pycache__/__init__.cpython-313.pyc")))],
                ])],
                ["_abc.py", new File(new TextEncoder().encode(read("./lib/pathlib/_abc.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/pathlib/__init__.py")))],
                ])],
                ["contextvars.py", new File(new TextEncoder().encode(read("./lib/contextvars.py")))],
                ["site.py", new File(new TextEncoder().encode(read("./lib/site.py")))],
                ["_ios_support.py", new File(new TextEncoder().encode(read("./lib/_ios_support.py")))],
                ["genericpath.py", new File(new TextEncoder().encode(read("./lib/genericpath.py")))],
                ["_weakrefset.py", new File(new TextEncoder().encode(read("./lib/_weakrefset.py")))],
                ["graphlib.py", new File(new TextEncoder().encode(read("./lib/graphlib.py")))],
                ["multiprocessing", new Directory([
                ["queues.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/queues.py")))],
                ["popen_forkserver.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/popen_forkserver.py")))],
                ["process.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/process.py")))],
                ["managers.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/managers.py")))],
                ["resource_sharer.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/resource_sharer.py")))],
                ["context.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/context.py")))],
                ["pool.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/pool.py")))],
                ["dummy", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/dummy/__init__.py")))],
                ["connection.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/dummy/connection.py")))],
                ])],
                ["forkserver.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/forkserver.py")))],
                ["heap.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/heap.py")))],
                ["spawn.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/spawn.py")))],
                ["reduction.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/reduction.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/__init__.py")))],
                ["resource_tracker.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/resource_tracker.py")))],
                ["popen_fork.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/popen_fork.py")))],
                ["sharedctypes.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/sharedctypes.py")))],
                ["popen_spawn_posix.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/popen_spawn_posix.py")))],
                ["util.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/util.py")))],
                ["connection.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/connection.py")))],
                ["popen_spawn_win32.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/popen_spawn_win32.py")))],
                ["shared_memory.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/shared_memory.py")))],
                ["synchronize.py", new File(new TextEncoder().encode(read("./lib/multiprocessing/synchronize.py")))],
                ])],
                ["tkinter", new Directory([
                ["constants.py", new File(new TextEncoder().encode(read("./lib/tkinter/constants.py")))],
                ["ttk.py", new File(new TextEncoder().encode(read("./lib/tkinter/ttk.py")))],
                ["messagebox.py", new File(new TextEncoder().encode(read("./lib/tkinter/messagebox.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/tkinter/__main__.py")))],
                ["colorchooser.py", new File(new TextEncoder().encode(read("./lib/tkinter/colorchooser.py")))],
                ["simpledialog.py", new File(new TextEncoder().encode(read("./lib/tkinter/simpledialog.py")))],
                ["commondialog.py", new File(new TextEncoder().encode(read("./lib/tkinter/commondialog.py")))],
                ["dnd.py", new File(new TextEncoder().encode(read("./lib/tkinter/dnd.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/tkinter/__init__.py")))],
                ["scrolledtext.py", new File(new TextEncoder().encode(read("./lib/tkinter/scrolledtext.py")))],
                ["filedialog.py", new File(new TextEncoder().encode(read("./lib/tkinter/filedialog.py")))],
                ["dialog.py", new File(new TextEncoder().encode(read("./lib/tkinter/dialog.py")))],
                ["font.py", new File(new TextEncoder().encode(read("./lib/tkinter/font.py")))],
                ])],
                ["stat.py", new File(new TextEncoder().encode(read("./lib/stat.py")))],
                ["ssl.py", new File(new TextEncoder().encode(read("./lib/ssl.py")))],
                ["__hello__.py", new File(new TextEncoder().encode(read("./lib/__hello__.py")))],
                ["__phello__", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/__phello__/__init__.py")))],
                ["ham", new Directory([
                ["eggs.py", new File(new TextEncoder().encode(read("./lib/__phello__/ham/eggs.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/__phello__/ham/__init__.py")))],
                ])],
                ["spam.py", new File(new TextEncoder().encode(read("./lib/__phello__/spam.py")))],
                ])],
                ["netrc.py", new File(new TextEncoder().encode(read("./lib/netrc.py")))],
                ["rlcompleter.py", new File(new TextEncoder().encode(read("./lib/rlcompleter.py")))],
                ["venv", new Directory([
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/venv/__main__.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/venv/__init__.py")))],
                ["scripts", new Directory([
                ["nt", new Directory([
                ["deactivate.bat", new File(new TextEncoder().encode(read("./lib/venv/scripts/nt/deactivate.bat")))],
                ["activate.bat", new File(new TextEncoder().encode(read("./lib/venv/scripts/nt/activate.bat")))],
                ])],
                ["posix", new Directory([
                ["activate.csh", new File(new TextEncoder().encode(read("./lib/venv/scripts/posix/activate.csh")))],
                ])],
                ["common", new Directory([
                ["activate", new File(new TextEncoder().encode(read("./lib/venv/scripts/common/activate")))],
                ["activate.fish", new File(new TextEncoder().encode(read("./lib/venv/scripts/common/activate.fish")))],
                ["Activate.ps1", new File(new TextEncoder().encode(read("./lib/venv/scripts/common/Activate.ps1")))],
                ])],
                ])],
                ])],
                ["functools.py", new File(new TextEncoder().encode(read("./lib/functools.py")))],
                ["contextlib.py", new File(new TextEncoder().encode(read("./lib/contextlib.py")))],
                ["collections", new Directory([
                ["abc.py", new File(new TextEncoder().encode(read("./lib/collections/abc.py")))],
                ["__pycache__", new Directory([
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/collections/__pycache__/__init__.cpython-313.pyc")))],
                ["abc.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/collections/__pycache__/abc.cpython-313.pyc")))],
                ])],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/collections/__init__.py")))],
                ])],
                ["turtledemo", new Directory([
                ["penrose.py", new File(new TextEncoder().encode(read("./lib/turtledemo/penrose.py")))],
                ["yinyang.py", new File(new TextEncoder().encode(read("./lib/turtledemo/yinyang.py")))],
                ["tree.py", new File(new TextEncoder().encode(read("./lib/turtledemo/tree.py")))],
                ["planet_and_moon.py", new File(new TextEncoder().encode(read("./lib/turtledemo/planet_and_moon.py")))],
                ["paint.py", new File(new TextEncoder().encode(read("./lib/turtledemo/paint.py")))],
                ["chaos.py", new File(new TextEncoder().encode(read("./lib/turtledemo/chaos.py")))],
                ["nim.py", new File(new TextEncoder().encode(read("./lib/turtledemo/nim.py")))],
                ["lindenmayer.py", new File(new TextEncoder().encode(read("./lib/turtledemo/lindenmayer.py")))],
                ["fractalcurves.py", new File(new TextEncoder().encode(read("./lib/turtledemo/fractalcurves.py")))],
                ["turtle.cfg", new File(new TextEncoder().encode(read("./lib/turtledemo/turtle.cfg")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/turtledemo/__main__.py")))],
                ["colormixer.py", new File(new TextEncoder().encode(read("./lib/turtledemo/colormixer.py")))],
                ["minimal_hanoi.py", new File(new TextEncoder().encode(read("./lib/turtledemo/minimal_hanoi.py")))],
                ["sorting_animate.py", new File(new TextEncoder().encode(read("./lib/turtledemo/sorting_animate.py")))],
                ["rosette.py", new File(new TextEncoder().encode(read("./lib/turtledemo/rosette.py")))],
                ["round_dance.py", new File(new TextEncoder().encode(read("./lib/turtledemo/round_dance.py")))],
                ["peace.py", new File(new TextEncoder().encode(read("./lib/turtledemo/peace.py")))],
                ["clock.py", new File(new TextEncoder().encode(read("./lib/turtledemo/clock.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/turtledemo/__init__.py")))],
                ["forest.py", new File(new TextEncoder().encode(read("./lib/turtledemo/forest.py")))],
                ["two_canvases.py", new File(new TextEncoder().encode(read("./lib/turtledemo/two_canvases.py")))],
                ["bytedesign.py", new File(new TextEncoder().encode(read("./lib/turtledemo/bytedesign.py")))],
                ])],
                ["pdb.py", new File(new TextEncoder().encode(read("./lib/pdb.py")))],
                ["ctypes", new Directory([
                ["macholib", new Directory([
                ["fetch_macholib.bat", new File(new TextEncoder().encode(read("./lib/ctypes/macholib/fetch_macholib.bat")))],
                ["dylib.py", new File(new TextEncoder().encode(read("./lib/ctypes/macholib/dylib.py")))],
                ["framework.py", new File(new TextEncoder().encode(read("./lib/ctypes/macholib/framework.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/ctypes/macholib/__init__.py")))],
                ["fetch_macholib", new File(new TextEncoder().encode(read("./lib/ctypes/macholib/fetch_macholib")))],
                ["dyld.py", new File(new TextEncoder().encode(read("./lib/ctypes/macholib/dyld.py")))],
                ["README.ctypes", new File(new TextEncoder().encode(read("./lib/ctypes/macholib/README.ctypes")))],
                ])],
                ["wintypes.py", new File(new TextEncoder().encode(read("./lib/ctypes/wintypes.py")))],
                ["_aix.py", new File(new TextEncoder().encode(read("./lib/ctypes/_aix.py")))],
                ["_endian.py", new File(new TextEncoder().encode(read("./lib/ctypes/_endian.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/ctypes/__init__.py")))],
                ["util.py", new File(new TextEncoder().encode(read("./lib/ctypes/util.py")))],
                ])],
                ["pickle.py", new File(new TextEncoder().encode(read("./lib/pickle.py")))],
                ["profile.py", new File(new TextEncoder().encode(read("./lib/profile.py")))],
                ["http", new Directory([
                ["cookies.py", new File(new TextEncoder().encode(read("./lib/http/cookies.py")))],
                ["client.py", new File(new TextEncoder().encode(read("./lib/http/client.py")))],
                ["cookiejar.py", new File(new TextEncoder().encode(read("./lib/http/cookiejar.py")))],
                ["server.py", new File(new TextEncoder().encode(read("./lib/http/server.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/http/__init__.py")))],
                ])],
                ["pickletools.py", new File(new TextEncoder().encode(read("./lib/pickletools.py")))],
                ["sre_parse.py", new File(new TextEncoder().encode(read("./lib/sre_parse.py")))],
                ["_py_abc.py", new File(new TextEncoder().encode(read("./lib/_py_abc.py")))],
                ["ftplib.py", new File(new TextEncoder().encode(read("./lib/ftplib.py")))],
                ["socketserver.py", new File(new TextEncoder().encode(read("./lib/socketserver.py")))],
                ["signal.py", new File(new TextEncoder().encode(read("./lib/signal.py")))],
                ["weakref.py", new File(new TextEncoder().encode(read("./lib/weakref.py")))],
                ["sre_constants.py", new File(new TextEncoder().encode(read("./lib/sre_constants.py")))],
                ["quopri.py", new File(new TextEncoder().encode(read("./lib/quopri.py")))],
                ["struct.py", new File(new TextEncoder().encode(read("./lib/struct.py")))],
                ["html", new Directory([
                ["parser.py", new File(new TextEncoder().encode(read("./lib/html/parser.py")))],
                ["entities.py", new File(new TextEncoder().encode(read("./lib/html/entities.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/html/__init__.py")))],
                ])],
                ["token.py", new File(new TextEncoder().encode(read("./lib/token.py")))],
                ["py_compile.py", new File(new TextEncoder().encode(read("./lib/py_compile.py")))],
                ["imaplib.py", new File(new TextEncoder().encode(read("./lib/imaplib.py")))],
                ["_markupbase.py", new File(new TextEncoder().encode(read("./lib/_markupbase.py")))],
                ["enum.py", new File(new TextEncoder().encode(read("./lib/enum.py")))],
                ["test", new Directory([
                ["test_zipimport.py", new File(new TextEncoder().encode(read("./lib/test/test_zipimport.py")))],
                ["test_ensurepip.py", new File(new TextEncoder().encode(read("./lib/test/test_ensurepip.py")))],
                ["test_funcattrs.py", new File(new TextEncoder().encode(read("./lib/test/test_funcattrs.py")))],
                ["test_codecmaps_tw.py", new File(new TextEncoder().encode(read("./lib/test/test_codecmaps_tw.py")))],
                ["test_httplib.py", new File(new TextEncoder().encode(read("./lib/test/test_httplib.py")))],
                ["test_xml_dom_minicompat.py", new File(new TextEncoder().encode(read("./lib/test/test_xml_dom_minicompat.py")))],
                ["test_multiprocessing_forkserver", new Directory([
                ["test_threads.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_forkserver/test_threads.py")))],
                ["test_processes.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_forkserver/test_processes.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_forkserver/__init__.py")))],
                ["test_manager.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_forkserver/test_manager.py")))],
                ["test_misc.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_forkserver/test_misc.py")))],
                ])],
                ["test_selectors.py", new File(new TextEncoder().encode(read("./lib/test/test_selectors.py")))],
                ["dtracedata", new Directory([
                ["gc.d", new File(new TextEncoder().encode(read("./lib/test/dtracedata/gc.d")))],
                ["gc.py", new File(new TextEncoder().encode(read("./lib/test/dtracedata/gc.py")))],
                ["call_stack.d", new File(new TextEncoder().encode(read("./lib/test/dtracedata/call_stack.d")))],
                ["assert_usable.stp", new File(new TextEncoder().encode(read("./lib/test/dtracedata/assert_usable.stp")))],
                ["line.d", new File(new TextEncoder().encode(read("./lib/test/dtracedata/line.d")))],
                ["instance.py", new File(new TextEncoder().encode(read("./lib/test/dtracedata/instance.py")))],
                ["gc.d.expected", new File(new TextEncoder().encode(read("./lib/test/dtracedata/gc.d.expected")))],
                ["call_stack.py", new File(new TextEncoder().encode(read("./lib/test/dtracedata/call_stack.py")))],
                ["call_stack.stp.expected", new File(new TextEncoder().encode(read("./lib/test/dtracedata/call_stack.stp.expected")))],
                ["gc.stp.expected", new File(new TextEncoder().encode(read("./lib/test/dtracedata/gc.stp.expected")))],
                ["gc.stp", new File(new TextEncoder().encode(read("./lib/test/dtracedata/gc.stp")))],
                ["call_stack.d.expected", new File(new TextEncoder().encode(read("./lib/test/dtracedata/call_stack.d.expected")))],
                ["line.d.expected", new File(new TextEncoder().encode(read("./lib/test/dtracedata/line.d.expected")))],
                ["assert_usable.d", new File(new TextEncoder().encode(read("./lib/test/dtracedata/assert_usable.d")))],
                ["call_stack.stp", new File(new TextEncoder().encode(read("./lib/test/dtracedata/call_stack.stp")))],
                ["line.py", new File(new TextEncoder().encode(read("./lib/test/dtracedata/line.py")))],
                ])],
                ["test_zipimport_support.py", new File(new TextEncoder().encode(read("./lib/test/test_zipimport_support.py")))],
                ["test_multiprocessing_main_handling.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_main_handling.py")))],
                ["test_ftplib.py", new File(new TextEncoder().encode(read("./lib/test/test_ftplib.py")))],
                ["tokenizedata", new Directory([
                ["badsyntax_3131.py", new File(new TextEncoder().encode(read("./lib/test/tokenizedata/badsyntax_3131.py")))],
                ["bad_coding2.py", new File(new TextEncoder().encode(read("./lib/test/tokenizedata/bad_coding2.py")))],
                ["tokenize_tests.txt", new File(new TextEncoder().encode(read("./lib/test/tokenizedata/tokenize_tests.txt")))],
                ["tokenize_tests-utf8-coding-cookie-and-utf8-bom-sig.txt", new File(new TextEncoder().encode(read("./lib/test/tokenizedata/tokenize_tests-utf8-coding-cookie-and-utf8-bom-sig.txt")))],
                ["tokenize_tests-no-coding-cookie-and-utf8-bom-sig-only.txt", new File(new TextEncoder().encode(read("./lib/test/tokenizedata/tokenize_tests-no-coding-cookie-and-utf8-bom-sig-only.txt")))],
                ["tokenize_tests-utf8-coding-cookie-and-no-utf8-bom-sig.txt", new File(new TextEncoder().encode(read("./lib/test/tokenizedata/tokenize_tests-utf8-coding-cookie-and-no-utf8-bom-sig.txt")))],
                ["badsyntax_pep3120.py", new File(new TextEncoder().encode(read("./lib/test/tokenizedata/badsyntax_pep3120.py")))],
                ["bad_coding.py", new File(new TextEncoder().encode(read("./lib/test/tokenizedata/bad_coding.py")))],
                ["tokenize_tests-latin1-coding-cookie-and-utf8-bom-sig.txt", new File(new TextEncoder().encode(read("./lib/test/tokenizedata/tokenize_tests-latin1-coding-cookie-and-utf8-bom-sig.txt")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/tokenizedata/__init__.py")))],
                ["coding20731.py", new File(new TextEncoder().encode(read("./lib/test/tokenizedata/coding20731.py")))],
                ])],
                ["test_collections.py", new File(new TextEncoder().encode(read("./lib/test/test_collections.py")))],
                ["randv2_32.pck", new File(new TextEncoder().encode(read("./lib/test/randv2_32.pck")))],
                ["pickletester.py", new File(new TextEncoder().encode(read("./lib/test/pickletester.py")))],
                ["test_lltrace.py", new File(new TextEncoder().encode(read("./lib/test/test_lltrace.py")))],
                ["test_unpack_ex.py", new File(new TextEncoder().encode(read("./lib/test/test_unpack_ex.py")))],
                ["test_wave.py", new File(new TextEncoder().encode(read("./lib/test/test_wave.py")))],
                ["test_code_module.py", new File(new TextEncoder().encode(read("./lib/test/test_code_module.py")))],
                ["test_wsgiref.py", new File(new TextEncoder().encode(read("./lib/test/test_wsgiref.py")))],
                ["test_pyclbr.py", new File(new TextEncoder().encode(read("./lib/test/test_pyclbr.py")))],
                ["test_userstring.py", new File(new TextEncoder().encode(read("./lib/test/test_userstring.py")))],
                ["test_compile.py", new File(new TextEncoder().encode(read("./lib/test/test_compile.py")))],
                ["regrtest.py", new File(new TextEncoder().encode(read("./lib/test/regrtest.py")))],
                ["test_range.py", new File(new TextEncoder().encode(read("./lib/test/test_range.py")))],
                ["test_cmd_line.py", new File(new TextEncoder().encode(read("./lib/test/test_cmd_line.py")))],
                ["wheeldata", new Directory([
                ["wheel-0.43.0-py3-none-any.whl", new File(new TextEncoder().encode(read("./lib/test/wheeldata/wheel-0.43.0-py3-none-any.whl")))],
                ["setuptools-67.6.1-py3-none-any.whl", new File(new TextEncoder().encode(read("./lib/test/wheeldata/setuptools-67.6.1-py3-none-any.whl")))],
                ])],
                ["test_codecencodings_tw.py", new File(new TextEncoder().encode(read("./lib/test/test_codecencodings_tw.py")))],
                ["test_setcomps.py", new File(new TextEncoder().encode(read("./lib/test/test_setcomps.py")))],
                ["test_wait3.py", new File(new TextEncoder().encode(read("./lib/test/test_wait3.py")))],
                ["subprocessdata", new Directory([
                ["fd_status.py", new File(new TextEncoder().encode(read("./lib/test/subprocessdata/fd_status.py")))],
                ["input_reader.py", new File(new TextEncoder().encode(read("./lib/test/subprocessdata/input_reader.py")))],
                ["sigchild_ignore.py", new File(new TextEncoder().encode(read("./lib/test/subprocessdata/sigchild_ignore.py")))],
                ["qcat.py", new File(new TextEncoder().encode(read("./lib/test/subprocessdata/qcat.py")))],
                ["qgrep.py", new File(new TextEncoder().encode(read("./lib/test/subprocessdata/qgrep.py")))],
                ])],
                ["test_fstring.py", new File(new TextEncoder().encode(read("./lib/test/test_fstring.py")))],
                ["test_dbm_dumb.py", new File(new TextEncoder().encode(read("./lib/test/test_dbm_dumb.py")))],
                ["test_pathlib", new Directory([
                ["test_pathlib.py", new File(new TextEncoder().encode(read("./lib/test/test_pathlib/test_pathlib.py")))],
                ["test_pathlib_abc.py", new File(new TextEncoder().encode(read("./lib/test/test_pathlib/test_pathlib_abc.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_pathlib/__init__.py")))],
                ])],
                ["test_tracemalloc.py", new File(new TextEncoder().encode(read("./lib/test/test_tracemalloc.py")))],
                ["test_random.py", new File(new TextEncoder().encode(read("./lib/test/test_random.py")))],
                ["test_perfmaps.py", new File(new TextEncoder().encode(read("./lib/test/test_perfmaps.py")))],
                ["test_index.py", new File(new TextEncoder().encode(read("./lib/test/test_index.py")))],
                ["test_keywordonlyarg.py", new File(new TextEncoder().encode(read("./lib/test/test_keywordonlyarg.py")))],
                ["testcodec.py", new File(new TextEncoder().encode(read("./lib/test/testcodec.py")))],
                ["curses_tests.py", new File(new TextEncoder().encode(read("./lib/test/curses_tests.py")))],
                ["test_complex.py", new File(new TextEncoder().encode(read("./lib/test/test_complex.py")))],
                ["test_xxlimited.py", new File(new TextEncoder().encode(read("./lib/test/test_xxlimited.py")))],
                ["test_queue.py", new File(new TextEncoder().encode(read("./lib/test/test_queue.py")))],
                ["test_frame.py", new File(new TextEncoder().encode(read("./lib/test/test_frame.py")))],
                ["test_copy.py", new File(new TextEncoder().encode(read("./lib/test/test_copy.py")))],
                ["test_slice.py", new File(new TextEncoder().encode(read("./lib/test/test_slice.py")))],
                ["test_script_helper.py", new File(new TextEncoder().encode(read("./lib/test/test_script_helper.py")))],
                ["test__interpreters.py", new File(new TextEncoder().encode(read("./lib/test/test__interpreters.py")))],
                ["test_fractions.py", new File(new TextEncoder().encode(read("./lib/test/test_fractions.py")))],
                ["test_cmd.py", new File(new TextEncoder().encode(read("./lib/test/test_cmd.py")))],
                ["test_list.py", new File(new TextEncoder().encode(read("./lib/test/test_list.py")))],
                ["test_urllib2.py", new File(new TextEncoder().encode(read("./lib/test/test_urllib2.py")))],
                ["test_pprint.py", new File(new TextEncoder().encode(read("./lib/test/test_pprint.py")))],
                ["test_poll.py", new File(new TextEncoder().encode(read("./lib/test/test_poll.py")))],
                ["test_userdict.py", new File(new TextEncoder().encode(read("./lib/test/test_userdict.py")))],
                ["levenshtein_examples.json", new File(new TextEncoder().encode(read("./lib/test/levenshtein_examples.json")))],
                ["test__osx_support.py", new File(new TextEncoder().encode(read("./lib/test/test__osx_support.py")))],
                ["test_property.py", new File(new TextEncoder().encode(read("./lib/test/test_property.py")))],
                ["tracedmodules", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/tracedmodules/__init__.py")))],
                ["testmod.py", new File(new TextEncoder().encode(read("./lib/test/tracedmodules/testmod.py")))],
                ])],
                ["test_exception_variations.py", new File(new TextEncoder().encode(read("./lib/test/test_exception_variations.py")))],
                ["test_threadedtempfile.py", new File(new TextEncoder().encode(read("./lib/test/test_threadedtempfile.py")))],
                ["clinic.test.c", new File(new TextEncoder().encode(read("./lib/test/clinic.test.c")))],
                ["test_socket.py", new File(new TextEncoder().encode(read("./lib/test/test_socket.py")))],
                ["test_flufl.py", new File(new TextEncoder().encode(read("./lib/test/test_flufl.py")))],
                ["test_dynamicclassattribute.py", new File(new TextEncoder().encode(read("./lib/test/test_dynamicclassattribute.py")))],
                ["test_difflib.py", new File(new TextEncoder().encode(read("./lib/test/test_difflib.py")))],
                ["test_devpoll.py", new File(new TextEncoder().encode(read("./lib/test/test_devpoll.py")))],
                ["test_format.py", new File(new TextEncoder().encode(read("./lib/test/test_format.py")))],
                ["pyclbr_input.py", new File(new TextEncoder().encode(read("./lib/test/pyclbr_input.py")))],
                ["test_defaultdict.py", new File(new TextEncoder().encode(read("./lib/test/test_defaultdict.py")))],
                ["test_builtin.py", new File(new TextEncoder().encode(read("./lib/test/test_builtin.py")))],
                ["test_compiler_codegen.py", new File(new TextEncoder().encode(read("./lib/test/test_compiler_codegen.py")))],
                ["test_dbm_sqlite3.py", new File(new TextEncoder().encode(read("./lib/test/test_dbm_sqlite3.py")))],
                ["test_threading_local.py", new File(new TextEncoder().encode(read("./lib/test/test_threading_local.py")))],
                ["test_signal.py", new File(new TextEncoder().encode(read("./lib/test/test_signal.py")))],
                ["test_urllibnet.py", new File(new TextEncoder().encode(read("./lib/test/test_urllibnet.py")))],
                ["test_winsound.py", new File(new TextEncoder().encode(read("./lib/test/test_winsound.py")))],
                ["test_urllib2net.py", new File(new TextEncoder().encode(read("./lib/test/test_urllib2net.py")))],
                ["test_multiprocessing_spawn", new Directory([
                ["test_threads.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_spawn/test_threads.py")))],
                ["test_processes.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_spawn/test_processes.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_spawn/__init__.py")))],
                ["test_manager.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_spawn/test_manager.py")))],
                ["test_misc.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_spawn/test_misc.py")))],
                ])],
                ["profilee.py", new File(new TextEncoder().encode(read("./lib/test/profilee.py")))],
                ["test_named_expressions.py", new File(new TextEncoder().encode(read("./lib/test/test_named_expressions.py")))],
                ["test_ipaddress.py", new File(new TextEncoder().encode(read("./lib/test/test_ipaddress.py")))],
                ["test_type_annotations.py", new File(new TextEncoder().encode(read("./lib/test/test_type_annotations.py")))],
                ["test_textwrap.py", new File(new TextEncoder().encode(read("./lib/test/test_textwrap.py")))],
                ["test_graphlib.py", new File(new TextEncoder().encode(read("./lib/test/test_graphlib.py")))],
                ["test_patma.py", new File(new TextEncoder().encode(read("./lib/test/test_patma.py")))],
                ["test_threading.py", new File(new TextEncoder().encode(read("./lib/test/test_threading.py")))],
                ["_test_venv_multiprocessing.py", new File(new TextEncoder().encode(read("./lib/test/_test_venv_multiprocessing.py")))],
                [".ruff.toml", new File(new TextEncoder().encode(read("./lib/test/.ruff.toml")))],
                ["test_smtpnet.py", new File(new TextEncoder().encode(read("./lib/test/test_smtpnet.py")))],
                ["test_tomllib", new Directory([
                ["burntsushi.py", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/burntsushi.py")))],
                ["test_data.py", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/test_data.py")))],
                ["data", new Directory([
                ["invalid", new Directory([
                ["missing-closing-double-square-bracket.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/missing-closing-double-square-bracket.toml")))],
                ["unclosed-string.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/unclosed-string.toml")))],
                ["multiline-literal-str", new Directory([
                ["file-ends-after-opening.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/multiline-literal-str/file-ends-after-opening.toml")))],
                ["unclosed.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/multiline-literal-str/unclosed.toml")))],
                ])],
                ["array", new Directory([
                ["unclosed-empty.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/array/unclosed-empty.toml")))],
                ["unclosed-after-item.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/array/unclosed-after-item.toml")))],
                ["file-end-after-val.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/array/file-end-after-val.toml")))],
                ])],
                ["unclosed-multiline-string.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/unclosed-multiline-string.toml")))],
                ["boolean", new Directory([
                ["invalid-true-casing.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/boolean/invalid-true-casing.toml")))],
                ["invalid-false-casing.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/boolean/invalid-false-casing.toml")))],
                ])],
                ["invalid-hex.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/invalid-hex.toml")))],
                ["dates-and-times", new Directory([
                ["invalid-day.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/dates-and-times/invalid-day.toml")))],
                ])],
                ["multiline-basic-str", new Directory([
                ["unclosed-ends-in-whitespace-escape.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/multiline-basic-str/unclosed-ends-in-whitespace-escape.toml")))],
                ["last-line-escape.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/multiline-basic-str/last-line-escape.toml")))],
                ["carriage-return.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/multiline-basic-str/carriage-return.toml")))],
                ["escape-only.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/multiline-basic-str/escape-only.toml")))],
                ["file-ends-after-opening.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/multiline-basic-str/file-ends-after-opening.toml")))],
                ])],
                ["non-scalar-escaped.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/non-scalar-escaped.toml")))],
                ["inline-table-missing-comma.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/inline-table-missing-comma.toml")))],
                ["literal-str", new Directory([
                ["unclosed.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/literal-str/unclosed.toml")))],
                ])],
                ["table", new Directory([
                ["redefine-2.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/table/redefine-2.toml")))],
                ["eof-after-opening.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/table/eof-after-opening.toml")))],
                ["redefine-1.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/table/redefine-1.toml")))],
                ])],
                ["basic-str-ends-in-escape.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/basic-str-ends-in-escape.toml")))],
                ["inline-table", new Directory([
                ["override-val-with-table.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/inline-table/override-val-with-table.toml")))],
                ["mutate.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/inline-table/mutate.toml")))],
                ["unclosed-empty.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/inline-table/unclosed-empty.toml")))],
                ["define-twice-in-subtable.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/inline-table/define-twice-in-subtable.toml")))],
                ["file-end-after-key-val.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/inline-table/file-end-after-key-val.toml")))],
                ["overwrite-value-in-inner-table.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/inline-table/overwrite-value-in-inner-table.toml")))],
                ["overwrite-implicitly.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/inline-table/overwrite-implicitly.toml")))],
                ["override-val-in-table.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/inline-table/override-val-in-table.toml")))],
                ["define-twice.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/inline-table/define-twice.toml")))],
                ["overwrite-value-in-inner-array.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/inline-table/overwrite-value-in-inner-array.toml")))],
                ["override-val-with-array.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/inline-table/override-val-with-array.toml")))],
                ])],
                ["invalid-escaped-unicode.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/invalid-escaped-unicode.toml")))],
                ["array-of-tables", new Directory([
                ["overwrite-array-in-parent.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/array-of-tables/overwrite-array-in-parent.toml")))],
                ["overwrite-bool-with-aot.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/array-of-tables/overwrite-bool-with-aot.toml")))],
                ])],
                ["array-missing-comma.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/array-missing-comma.toml")))],
                ["missing-closing-square-bracket.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/missing-closing-square-bracket.toml")))],
                ["keys-and-vals", new Directory([
                ["ends-early-table-def.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/keys-and-vals/ends-early-table-def.toml")))],
                ["ends-early.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/keys-and-vals/ends-early.toml")))],
                ["overwrite-with-deep-table.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/keys-and-vals/overwrite-with-deep-table.toml")))],
                ["only-ws-after-dot.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/keys-and-vals/only-ws-after-dot.toml")))],
                ["no-value.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/keys-and-vals/no-value.toml")))],
                ])],
                ["dotted-keys", new Directory([
                ["extend-defined-table.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/dotted-keys/extend-defined-table.toml")))],
                ["extend-defined-table-with-subtable.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/dotted-keys/extend-defined-table-with-subtable.toml")))],
                ["access-non-table.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/dotted-keys/access-non-table.toml")))],
                ["extend-defined-aot.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/dotted-keys/extend-defined-aot.toml")))],
                ])],
                ["invalid-comment-char.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/invalid/invalid-comment-char.toml")))],
                ])],
                ["valid", new Directory([
                ["five-quotes.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/five-quotes.toml")))],
                ["array", new Directory([
                ["array-subtables.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/array/array-subtables.toml")))],
                ["open-parent-table.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/array/open-parent-table.toml")))],
                ["open-parent-table.json", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/array/open-parent-table.json")))],
                ["array-subtables.json", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/array/array-subtables.json")))],
                ])],
                ["no-newlines.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/no-newlines.toml")))],
                ["dates-and-times", new Directory([
                ["localtime.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/dates-and-times/localtime.toml")))],
                ["datetimes.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/dates-and-times/datetimes.toml")))],
                ["datetimes.json", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/dates-and-times/datetimes.json")))],
                ["localtime.json", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/dates-and-times/localtime.json")))],
                ])],
                ["boolean.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/boolean.toml")))],
                ["hex-char.json", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/hex-char.json")))],
                ["multiline-basic-str", new Directory([
                ["ends-in-whitespace-escape.json", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/multiline-basic-str/ends-in-whitespace-escape.json")))],
                ["ends-in-whitespace-escape.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/multiline-basic-str/ends-in-whitespace-escape.toml")))],
                ])],
                ["apostrophes-in-literal-string.json", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/apostrophes-in-literal-string.json")))],
                ["trailing-comma.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/trailing-comma.toml")))],
                ["empty-inline-table.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/empty-inline-table.toml")))],
                ["five-quotes.json", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/five-quotes.json")))],
                ["hex-char.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/hex-char.toml")))],
                ["empty-inline-table.json", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/empty-inline-table.json")))],
                ["trailing-comma.json", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/trailing-comma.json")))],
                ["no-newlines.json", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/no-newlines.json")))],
                ["apostrophes-in-literal-string.toml", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/apostrophes-in-literal-string.toml")))],
                ["boolean.json", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/data/valid/boolean.json")))],
                ])],
                ])],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/__main__.py")))],
                ["test_error.py", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/test_error.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/__init__.py")))],
                ["test_misc.py", new File(new TextEncoder().encode(read("./lib/test/test_tomllib/test_misc.py")))],
                ])],
                ["test_heapq.py", new File(new TextEncoder().encode(read("./lib/test/test_heapq.py")))],
                ["test_audit.py", new File(new TextEncoder().encode(read("./lib/test/test_audit.py")))],
                ["test_codecencodings_cn.py", new File(new TextEncoder().encode(read("./lib/test/test_codecencodings_cn.py")))],
                ["test_pwd.py", new File(new TextEncoder().encode(read("./lib/test/test_pwd.py")))],
                ["test_inspect", new Directory([
                ["inspect_stringized_annotations_2.py", new File(new TextEncoder().encode(read("./lib/test/test_inspect/inspect_stringized_annotations_2.py")))],
                ["inspect_fodder.py", new File(new TextEncoder().encode(read("./lib/test/test_inspect/inspect_fodder.py")))],
                ["inspect_fodder2.py", new File(new TextEncoder().encode(read("./lib/test/test_inspect/inspect_fodder2.py")))],
                ["test_inspect.py", new File(new TextEncoder().encode(read("./lib/test/test_inspect/test_inspect.py")))],
                ["inspect_stock_annotations.py", new File(new TextEncoder().encode(read("./lib/test/test_inspect/inspect_stock_annotations.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_inspect/__init__.py")))],
                ["inspect_stringized_annotations.py", new File(new TextEncoder().encode(read("./lib/test/test_inspect/inspect_stringized_annotations.py")))],
                ])],
                ["test_eintr.py", new File(new TextEncoder().encode(read("./lib/test/test_eintr.py")))],
                ["test_tcl.py", new File(new TextEncoder().encode(read("./lib/test/test_tcl.py")))],
                ["test_uuid.py", new File(new TextEncoder().encode(read("./lib/test/test_uuid.py")))],
                ["test_bisect.py", new File(new TextEncoder().encode(read("./lib/test/test_bisect.py")))],
                ["test_peg_generator", new Directory([
                ["test_grammar_validator.py", new File(new TextEncoder().encode(read("./lib/test/test_peg_generator/test_grammar_validator.py")))],
                ["test_c_parser.py", new File(new TextEncoder().encode(read("./lib/test/test_peg_generator/test_c_parser.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_peg_generator/__main__.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_peg_generator/__init__.py")))],
                ["test_pegen.py", new File(new TextEncoder().encode(read("./lib/test/test_peg_generator/test_pegen.py")))],
                ["test_first_sets.py", new File(new TextEncoder().encode(read("./lib/test/test_peg_generator/test_first_sets.py")))],
                ])],
                ["test_embed.py", new File(new TextEncoder().encode(read("./lib/test/test_embed.py")))],
                ["test_readline.py", new File(new TextEncoder().encode(read("./lib/test/test_readline.py")))],
                ["win_console_handler.py", new File(new TextEncoder().encode(read("./lib/test/win_console_handler.py")))],
                ["dis_module.py", new File(new TextEncoder().encode(read("./lib/test/dis_module.py")))],
                ["test_http_cookiejar.py", new File(new TextEncoder().encode(read("./lib/test/test_http_cookiejar.py")))],
                ["test_statistics.py", new File(new TextEncoder().encode(read("./lib/test/test_statistics.py")))],
                ["test_dbm_gnu.py", new File(new TextEncoder().encode(read("./lib/test/test_dbm_gnu.py")))],
                ["test_stringprep.py", new File(new TextEncoder().encode(read("./lib/test/test_stringprep.py")))],
                ["test_difflib_expect.html", new File(new TextEncoder().encode(read("./lib/test/test_difflib_expect.html")))],
                ["test_support.py", new File(new TextEncoder().encode(read("./lib/test/test_support.py")))],
                ["test_utf8_mode.py", new File(new TextEncoder().encode(read("./lib/test/test_utf8_mode.py")))],
                ["memory_watchdog.py", new File(new TextEncoder().encode(read("./lib/test/memory_watchdog.py")))],
                ["test_winconsoleio.py", new File(new TextEncoder().encode(read("./lib/test/test_winconsoleio.py")))],
                ["regrtestdata", new Directory([
                ["import_from_tests", new Directory([
                ["test_regrtest_c.py", new File(new TextEncoder().encode(read("./lib/test/regrtestdata/import_from_tests/test_regrtest_c.py")))],
                ["test_regrtest_b", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/regrtestdata/import_from_tests/test_regrtest_b/__init__.py")))],
                ["util.py", new File(new TextEncoder().encode(read("./lib/test/regrtestdata/import_from_tests/test_regrtest_b/util.py")))],
                ])],
                ["test_regrtest_a.py", new File(new TextEncoder().encode(read("./lib/test/regrtestdata/import_from_tests/test_regrtest_a.py")))],
                ])],
                ])],
                ["test_urllib.py", new File(new TextEncoder().encode(read("./lib/test/test_urllib.py")))],
                ["test_dbm_ndbm.py", new File(new TextEncoder().encode(read("./lib/test/test_dbm_ndbm.py")))],
                ["test___all__.py", new File(new TextEncoder().encode(read("./lib/test/test___all__.py")))],
                ["test_finalization.py", new File(new TextEncoder().encode(read("./lib/test/test_finalization.py")))],
                ["test_linecache.py", new File(new TextEncoder().encode(read("./lib/test/test_linecache.py")))],
                ["test_richcmp.py", new File(new TextEncoder().encode(read("./lib/test/test_richcmp.py")))],
                ["test_set.py", new File(new TextEncoder().encode(read("./lib/test/test_set.py")))],
                ["test_shutil.py", new File(new TextEncoder().encode(read("./lib/test/test_shutil.py")))],
                ["data", new Directory([
                ["README", new File(new TextEncoder().encode(read("./lib/test/data/README")))],
                ])],
                ["test_netrc.py", new File(new TextEncoder().encode(read("./lib/test/test_netrc.py")))],
                ["test_fnmatch.py", new File(new TextEncoder().encode(read("./lib/test/test_fnmatch.py")))],
                ["test_plistlib.py", new File(new TextEncoder().encode(read("./lib/test/test_plistlib.py")))],
                ["test_stat.py", new File(new TextEncoder().encode(read("./lib/test/test_stat.py")))],
                ["test_bigaddrspace.py", new File(new TextEncoder().encode(read("./lib/test/test_bigaddrspace.py")))],
                ["test_dict.py", new File(new TextEncoder().encode(read("./lib/test/test_dict.py")))],
                ["test_codecs.py", new File(new TextEncoder().encode(read("./lib/test/test_codecs.py")))],
                ["test_weakset.py", new File(new TextEncoder().encode(read("./lib/test/test_weakset.py")))],
                ["test_bdb.py", new File(new TextEncoder().encode(read("./lib/test/test_bdb.py")))],
                ["test_codeccallbacks.py", new File(new TextEncoder().encode(read("./lib/test/test_codeccallbacks.py")))],
                ["test_long.py", new File(new TextEncoder().encode(read("./lib/test/test_long.py")))],
                ["test_extcall.py", new File(new TextEncoder().encode(read("./lib/test/test_extcall.py")))],
                ["test_shlex.py", new File(new TextEncoder().encode(read("./lib/test/test_shlex.py")))],
                ["test_site.py", new File(new TextEncoder().encode(read("./lib/test/test_site.py")))],
                ["test_syntax.py", new File(new TextEncoder().encode(read("./lib/test/test_syntax.py")))],
                ["test_scope.py", new File(new TextEncoder().encode(read("./lib/test/test_scope.py")))],
                ["test_codecmaps_kr.py", new File(new TextEncoder().encode(read("./lib/test/test_codecmaps_kr.py")))],
                ["test_descrtut.py", new File(new TextEncoder().encode(read("./lib/test/test_descrtut.py")))],
                ["fork_wait.py", new File(new TextEncoder().encode(read("./lib/test/fork_wait.py")))],
                ["test_wait4.py", new File(new TextEncoder().encode(read("./lib/test/test_wait4.py")))],
                ["test_math_property.py", new File(new TextEncoder().encode(read("./lib/test/test_math_property.py")))],
                ["test_strftime.py", new File(new TextEncoder().encode(read("./lib/test/test_strftime.py")))],
                ["test_colorsys.py", new File(new TextEncoder().encode(read("./lib/test/test_colorsys.py")))],
                ["test_traceback.py", new File(new TextEncoder().encode(read("./lib/test/test_traceback.py")))],
                ["test_osx_env.py", new File(new TextEncoder().encode(read("./lib/test/test_osx_env.py")))],
                ["test_optparse.py", new File(new TextEncoder().encode(read("./lib/test/test_optparse.py")))],
                ["test_timeout.py", new File(new TextEncoder().encode(read("./lib/test/test_timeout.py")))],
                ["test_longexp.py", new File(new TextEncoder().encode(read("./lib/test/test_longexp.py")))],
                ["test_exception_hierarchy.py", new File(new TextEncoder().encode(read("./lib/test/test_exception_hierarchy.py")))],
                ["test_exception_group.py", new File(new TextEncoder().encode(read("./lib/test/test_exception_group.py")))],
                ["test_termios.py", new File(new TextEncoder().encode(read("./lib/test/test_termios.py")))],
                ["_test_embed_set_config.py", new File(new TextEncoder().encode(read("./lib/test/_test_embed_set_config.py")))],
                ["test_array.py", new File(new TextEncoder().encode(read("./lib/test/test_array.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/__main__.py")))],
                ["test_email", new Directory([
                ["test_message.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test_message.py")))],
                ["test_asian_codecs.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test_asian_codecs.py")))],
                ["data", new Directory([
                ["msg_02.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_02.txt")))],
                ["msg_10.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_10.txt")))],
                ["msg_20.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_20.txt")))],
                ["msg_41.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_41.txt")))],
                ["msg_26.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_26.txt")))],
                ["python.jpg", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.jpg")))],
                ["msg_19.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_19.txt")))],
                ["msg_23.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_23.txt")))],
                ["msg_07.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_07.txt")))],
                ["msg_42.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_42.txt")))],
                ["msg_14.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_14.txt")))],
                ["msg_04.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_04.txt")))],
                ["python.png", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.png")))],
                ["msg_43.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_43.txt")))],
                ["python.tiff", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.tiff")))],
                ["msg_16.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_16.txt")))],
                ["python.webp", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.webp")))],
                ["sndhdr.wav", new File(new TextEncoder().encode(read("./lib/test/test_email/data/sndhdr.wav")))],
                ["msg_31.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_31.txt")))],
                ["msg_17.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_17.txt")))],
                ["python.gif", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.gif")))],
                ["python.xbm", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.xbm")))],
                ["msg_36.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_36.txt")))],
                ["msg_01.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_01.txt")))],
                ["python.pbm", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.pbm")))],
                ["msg_37.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_37.txt")))],
                ["msg_47.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_47.txt")))],
                ["sndhdr.au", new File(new TextEncoder().encode(read("./lib/test/test_email/data/sndhdr.au")))],
                ["msg_25.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_25.txt")))],
                ["msg_45.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_45.txt")))],
                ["python.ras", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.ras")))],
                ["python.sgi", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.sgi")))],
                ["msg_13.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_13.txt")))],
                ["msg_12.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_12.txt")))],
                ["msg_03.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_03.txt")))],
                ["msg_22.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_22.txt")))],
                ["msg_11.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_11.txt")))],
                ["python.pgm", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.pgm")))],
                ["msg_40.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_40.txt")))],
                ["msg_32.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_32.txt")))],
                ["msg_28.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_28.txt")))],
                ["msg_38.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_38.txt")))],
                ["msg_18.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_18.txt")))],
                ["msg_46.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_46.txt")))],
                ["python.ppm", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.ppm")))],
                ["msg_08.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_08.txt")))],
                ["msg_27.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_27.txt")))],
                ["msg_33.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_33.txt")))],
                ["msg_35.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_35.txt")))],
                ["python.exr", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.exr")))],
                ["msg_09.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_09.txt")))],
                ["sndhdr.aiff", new File(new TextEncoder().encode(read("./lib/test/test_email/data/sndhdr.aiff")))],
                ["msg_21.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_21.txt")))],
                ["msg_39.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_39.txt")))],
                ["msg_34.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_34.txt")))],
                ["msg_30.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_30.txt")))],
                ["msg_06.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_06.txt")))],
                ["msg_12a.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_12a.txt")))],
                ["msg_15.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_15.txt")))],
                ["msg_44.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_44.txt")))],
                ["msg_05.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_05.txt")))],
                ["python.bmp", new File(new TextEncoder().encode(read("./lib/test/test_email/data/python.bmp")))],
                ["msg_24.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_24.txt")))],
                ["sndhdr.aifc", new File(new TextEncoder().encode(read("./lib/test/test_email/data/sndhdr.aifc")))],
                ["msg_29.txt", new File(new TextEncoder().encode(read("./lib/test/test_email/data/msg_29.txt")))],
                ])],
                ["test_generator.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test_generator.py")))],
                ["test_defect_handling.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test_defect_handling.py")))],
                ["test__encoded_words.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test__encoded_words.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_email/__main__.py")))],
                ["torture_test.py", new File(new TextEncoder().encode(read("./lib/test/test_email/torture_test.py")))],
                ["test_email.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test_email.py")))],
                ["test_policy.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test_policy.py")))],
                ["test_inversion.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test_inversion.py")))],
                ["test_contentmanager.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test_contentmanager.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_email/__init__.py")))],
                ["test_utils.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test_utils.py")))],
                ["test__header_value_parser.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test__header_value_parser.py")))],
                ["test_parser.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test_parser.py")))],
                ["test_headerregistry.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test_headerregistry.py")))],
                ["test_pickleable.py", new File(new TextEncoder().encode(read("./lib/test/test_email/test_pickleable.py")))],
                ])],
                ["tkinterdata", new Directory([
                ["python.png", new File(new TextEncoder().encode(read("./lib/test/tkinterdata/python.png")))],
                ["python.gif", new File(new TextEncoder().encode(read("./lib/test/tkinterdata/python.gif")))],
                ["python.xbm", new File(new TextEncoder().encode(read("./lib/test/tkinterdata/python.xbm")))],
                ["python.pgm", new File(new TextEncoder().encode(read("./lib/test/tkinterdata/python.pgm")))],
                ["python.ppm", new File(new TextEncoder().encode(read("./lib/test/tkinterdata/python.ppm")))],
                ])],
                ["test_winapi.py", new File(new TextEncoder().encode(read("./lib/test/test_winapi.py")))],
                ["test_c_locale_coercion.py", new File(new TextEncoder().encode(read("./lib/test/test_c_locale_coercion.py")))],
                ["test_idle.py", new File(new TextEncoder().encode(read("./lib/test/test_idle.py")))],
                ["tf_inherit_check.py", new File(new TextEncoder().encode(read("./lib/test/tf_inherit_check.py")))],
                ["cov.py", new File(new TextEncoder().encode(read("./lib/test/cov.py")))],
                ["test_codecencodings_iso2022.py", new File(new TextEncoder().encode(read("./lib/test/test_codecencodings_iso2022.py")))],
                ["test_gettext.py", new File(new TextEncoder().encode(read("./lib/test/test_gettext.py")))],
                ["randv3.pck", new File(new TextEncoder().encode(read("./lib/test/randv3.pck")))],
                ["test_pickletools.py", new File(new TextEncoder().encode(read("./lib/test/test_pickletools.py")))],
                ["test_pdb.py", new File(new TextEncoder().encode(read("./lib/test/test_pdb.py")))],
                ["test_deque.py", new File(new TextEncoder().encode(read("./lib/test/test_deque.py")))],
                ["test_getpass.py", new File(new TextEncoder().encode(read("./lib/test/test_getpass.py")))],
                ["test_contextlib_async.py", new File(new TextEncoder().encode(read("./lib/test/test_contextlib_async.py")))],
                ["test_memoryview.py", new File(new TextEncoder().encode(read("./lib/test/test_memoryview.py")))],
                ["test_minidom.py", new File(new TextEncoder().encode(read("./lib/test/test_minidom.py")))],
                ["audiotests.py", new File(new TextEncoder().encode(read("./lib/test/audiotests.py")))],
                ["test_strptime.py", new File(new TextEncoder().encode(read("./lib/test/test_strptime.py")))],
                ["test_interpreters", new Directory([
                ["test_queues.py", new File(new TextEncoder().encode(read("./lib/test/test_interpreters/test_queues.py")))],
                ["test_api.py", new File(new TextEncoder().encode(read("./lib/test/test_interpreters/test_api.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_interpreters/__main__.py")))],
                ["utils.py", new File(new TextEncoder().encode(read("./lib/test/test_interpreters/utils.py")))],
                ["test_channels.py", new File(new TextEncoder().encode(read("./lib/test/test_interpreters/test_channels.py")))],
                ["test_lifecycle.py", new File(new TextEncoder().encode(read("./lib/test/test_interpreters/test_lifecycle.py")))],
                ["test_stress.py", new File(new TextEncoder().encode(read("./lib/test/test_interpreters/test_stress.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_interpreters/__init__.py")))],
                ])],
                ["test_pstats.py", new File(new TextEncoder().encode(read("./lib/test/test_pstats.py")))],
                ["test_dictviews.py", new File(new TextEncoder().encode(read("./lib/test/test_dictviews.py")))],
                ["test_cmath.py", new File(new TextEncoder().encode(read("./lib/test/test_cmath.py")))],
                ["test_opcache.py", new File(new TextEncoder().encode(read("./lib/test/test_opcache.py")))],
                ["mapping_tests.py", new File(new TextEncoder().encode(read("./lib/test/mapping_tests.py")))],
                ["test_zipapp.py", new File(new TextEncoder().encode(read("./lib/test/test_zipapp.py")))],
                ["test_xml_etree.py", new File(new TextEncoder().encode(read("./lib/test/test_xml_etree.py")))],
                ["seq_tests.py", new File(new TextEncoder().encode(read("./lib/test/seq_tests.py")))],
                ["test_asdl_parser.py", new File(new TextEncoder().encode(read("./lib/test/test_asdl_parser.py")))],
                ["test_htmlparser.py", new File(new TextEncoder().encode(read("./lib/test/test_htmlparser.py")))],
                ["test_imaplib.py", new File(new TextEncoder().encode(read("./lib/test/test_imaplib.py")))],
                ["test_unparse.py", new File(new TextEncoder().encode(read("./lib/test/test_unparse.py")))],
                ["test_capi", new Directory([
                ["test_eval_code_ex.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_eval_code_ex.py")))],
                ["test_mem.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_mem.py")))],
                ["test_object.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_object.py")))],
                ["test_complex.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_complex.py")))],
                ["test_list.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_list.py")))],
                ["test_getargs.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_getargs.py")))],
                ["test_unicode.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_unicode.py")))],
                ["test_bytearray.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_bytearray.py")))],
                ["test_run.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_run.py")))],
                ["test_set.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_set.py")))],
                ["test_dict.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_dict.py")))],
                ["test_codecs.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_codecs.py")))],
                ["test_long.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_long.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/__main__.py")))],
                ["check_config.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/check_config.py")))],
                ["test_watchers.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_watchers.py")))],
                ["test_time.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_time.py")))],
                ["test_exceptions.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_exceptions.py")))],
                ["test_bytes.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_bytes.py")))],
                ["test_immortal.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_immortal.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/__init__.py")))],
                ["test_float.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_float.py")))],
                ["test_pyatomic.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_pyatomic.py")))],
                ["test_abstract.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_abstract.py")))],
                ["test_opt.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_opt.py")))],
                ["test_hash.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_hash.py")))],
                ["test_structmembers.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_structmembers.py")))],
                ["test_sys.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_sys.py")))],
                ["test_misc.py", new File(new TextEncoder().encode(read("./lib/test/test_capi/test_misc.py")))],
                ])],
                ["test_opcodes.py", new File(new TextEncoder().encode(read("./lib/test/test_opcodes.py")))],
                ["test_tkinter", new Directory([
                ["test_text.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/test_text.py")))],
                ["support.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/support.py")))],
                ["test_images.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/test_images.py")))],
                ["test_font.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/test_font.py")))],
                ["test_variables.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/test_variables.py")))],
                ["test_colorchooser.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/test_colorchooser.py")))],
                ["widget_tests.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/widget_tests.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/__main__.py")))],
                ["test_messagebox.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/test_messagebox.py")))],
                ["test_geometry_managers.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/test_geometry_managers.py")))],
                ["README", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/README")))],
                ["test_widgets.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/test_widgets.py")))],
                ["test_loadtk.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/test_loadtk.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/__init__.py")))],
                ["test_simpledialog.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/test_simpledialog.py")))],
                ["test_misc.py", new File(new TextEncoder().encode(read("./lib/test/test_tkinter/test_misc.py")))],
                ])],
                ["test_raise.py", new File(new TextEncoder().encode(read("./lib/test/test_raise.py")))],
                ["test_int.py", new File(new TextEncoder().encode(read("./lib/test/test_int.py")))],
                ["test_typing.py", new File(new TextEncoder().encode(read("./lib/test/test_typing.py")))],
                ["test_largefile.py", new File(new TextEncoder().encode(read("./lib/test/test_largefile.py")))],
                ["test_type_cache.py", new File(new TextEncoder().encode(read("./lib/test/test_type_cache.py")))],
                ["test_shelve.py", new File(new TextEncoder().encode(read("./lib/test/test_shelve.py")))],
                ["test_wmi.py", new File(new TextEncoder().encode(read("./lib/test/test_wmi.py")))],
                ["test_warnings", new Directory([
                ["data", new Directory([
                ["import_warning.py", new File(new TextEncoder().encode(read("./lib/test/test_warnings/data/import_warning.py")))],
                ["stacklevel.py", new File(new TextEncoder().encode(read("./lib/test/test_warnings/data/stacklevel.py")))],
                ["package_helper.py", new File(new TextEncoder().encode(read("./lib/test/test_warnings/data/package_helper.py")))],
                ])],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_warnings/__main__.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_warnings/__init__.py")))],
                ])],
                ["test_codecmaps_cn.py", new File(new TextEncoder().encode(read("./lib/test/test_codecmaps_cn.py")))],
                ["test_unittest", new Directory([
                ["test_functiontestcase.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_functiontestcase.py")))],
                ["support.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/support.py")))],
                ["test_skipping.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_skipping.py")))],
                ["dummy.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/dummy.py")))],
                ["_test_warnings.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/_test_warnings.py")))],
                ["test_loader.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_loader.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/__main__.py")))],
                ["test_suite.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_suite.py")))],
                ["test_async_case.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_async_case.py")))],
                ["test_runner.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_runner.py")))],
                ["test_program.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_program.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/__init__.py")))],
                ["test_setups.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_setups.py")))],
                ["test_break.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_break.py")))],
                ["test_case.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_case.py")))],
                ["test_assertions.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_assertions.py")))],
                ["testmock", new Directory([
                ["testcallable.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/testcallable.py")))],
                ["support.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/support.py")))],
                ["testpatch.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/testpatch.py")))],
                ["testasync.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/testasync.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/__main__.py")))],
                ["testsentinel.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/testsentinel.py")))],
                ["testsealable.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/testsealable.py")))],
                ["testwith.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/testwith.py")))],
                ["testmagicmethods.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/testmagicmethods.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/__init__.py")))],
                ["testthreadingmock.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/testthreadingmock.py")))],
                ["testhelpers.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/testhelpers.py")))],
                ["testmock.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/testmock/testmock.py")))],
                ])],
                ["test_discovery.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_discovery.py")))],
                ["test_result.py", new File(new TextEncoder().encode(read("./lib/test/test_unittest/test_result.py")))],
                ])],
                ["pstats.pck", new File(new TextEncoder().encode(read("./lib/test/pstats.pck")))],
                ["test_argparse.py", new File(new TextEncoder().encode(read("./lib/test/test_argparse.py")))],
                ["test_stable_abi_ctypes.py", new File(new TextEncoder().encode(read("./lib/test/test_stable_abi_ctypes.py")))],
                ["test_bigmem.py", new File(new TextEncoder().encode(read("./lib/test/test_bigmem.py")))],
                ["test__locale.py", new File(new TextEncoder().encode(read("./lib/test/test__locale.py")))],
                ["multibytecodec_support.py", new File(new TextEncoder().encode(read("./lib/test/multibytecodec_support.py")))],
                ["test_codecencodings_hk.py", new File(new TextEncoder().encode(read("./lib/test/test_codecencodings_hk.py")))],
                ["test_pty.py", new File(new TextEncoder().encode(read("./lib/test/test_pty.py")))],
                ["test_winreg.py", new File(new TextEncoder().encode(read("./lib/test/test_winreg.py")))],
                ["test_codecmaps_jp.py", new File(new TextEncoder().encode(read("./lib/test/test_codecmaps_jp.py")))],
                ["test_xml_etree_c.py", new File(new TextEncoder().encode(read("./lib/test/test_xml_etree_c.py")))],
                ["audiodata", new Directory([
                ["pluck-pcm8.wav", new File(new TextEncoder().encode(read("./lib/test/audiodata/pluck-pcm8.wav")))],
                ["pluck-pcm24.wav", new File(new TextEncoder().encode(read("./lib/test/audiodata/pluck-pcm24.wav")))],
                ["pluck-pcm24-ext.wav", new File(new TextEncoder().encode(read("./lib/test/audiodata/pluck-pcm24-ext.wav")))],
                ["pluck-pcm32.wav", new File(new TextEncoder().encode(read("./lib/test/audiodata/pluck-pcm32.wav")))],
                ["pluck-pcm16.wav", new File(new TextEncoder().encode(read("./lib/test/audiodata/pluck-pcm16.wav")))],
                ])],
                ["test_sort.py", new File(new TextEncoder().encode(read("./lib/test/test_sort.py")))],
                ["exception_hierarchy.txt", new File(new TextEncoder().encode(read("./lib/test/exception_hierarchy.txt")))],
                ["configdata", new Directory([
                ["cfgparser.1", new File(new TextEncoder().encode(read("./lib/test/configdata/cfgparser.1")))],
                ["cfgparser.2", new File(new TextEncoder().encode(read("./lib/test/configdata/cfgparser.2")))],
                ["cfgparser.3", new File(new TextEncoder().encode(read("./lib/test/configdata/cfgparser.3")))],
                ])],
                ["test_epoll.py", new File(new TextEncoder().encode(read("./lib/test/test_epoll.py")))],
                ["ssl_servers.py", new File(new TextEncoder().encode(read("./lib/test/ssl_servers.py")))],
                ["test_compare.py", new File(new TextEncoder().encode(read("./lib/test/test_compare.py")))],
                ["typinganndata", new Directory([
                ["ann_module7.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/ann_module7.py")))],
                ["ann_module5.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/ann_module5.py")))],
                ["_typed_dict_helper.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/_typed_dict_helper.py")))],
                ["ann_module2.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/ann_module2.py")))],
                ["ann_module6.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/ann_module6.py")))],
                ["ann_module3.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/ann_module3.py")))],
                ["ann_module9.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/ann_module9.py")))],
                ["ann_module695.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/ann_module695.py")))],
                ["ann_module8.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/ann_module8.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/__init__.py")))],
                ["mod_generics_cache.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/mod_generics_cache.py")))],
                ["ann_module4.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/ann_module4.py")))],
                ["ann_module.py", new File(new TextEncoder().encode(read("./lib/test/typinganndata/ann_module.py")))],
                ])],
                ["test_timeit.py", new File(new TextEncoder().encode(read("./lib/test/test_timeit.py")))],
                ["test_grp.py", new File(new TextEncoder().encode(read("./lib/test/test_grp.py")))],
                ["test_errno.py", new File(new TextEncoder().encode(read("./lib/test/test_errno.py")))],
                ["test_print.py", new File(new TextEncoder().encode(read("./lib/test/test_print.py")))],
                ["test_json", new Directory([
                ["test_fail.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_fail.py")))],
                ["test_encode_basestring_ascii.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_encode_basestring_ascii.py")))],
                ["test_unicode.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_unicode.py")))],
                ["test_separators.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_separators.py")))],
                ["test_default.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_default.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_json/__main__.py")))],
                ["test_recursion.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_recursion.py")))],
                ["test_pass1.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_pass1.py")))],
                ["test_scanstring.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_scanstring.py")))],
                ["test_enum.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_enum.py")))],
                ["test_decode.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_decode.py")))],
                ["test_indent.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_indent.py")))],
                ["test_speedups.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_speedups.py")))],
                ["test_dump.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_dump.py")))],
                ["test_pass2.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_pass2.py")))],
                ["test_pass3.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_pass3.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_json/__init__.py")))],
                ["test_float.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_float.py")))],
                ["test_tool.py", new File(new TextEncoder().encode(read("./lib/test/test_json/test_tool.py")))],
                ])],
                ["test__interpchannels.py", new File(new TextEncoder().encode(read("./lib/test/test__interpchannels.py")))],
                ["test_atexit.py", new File(new TextEncoder().encode(read("./lib/test/test_atexit.py")))],
                ["test_type_params.py", new File(new TextEncoder().encode(read("./lib/test/test_type_params.py")))],
                ["test_keyword.py", new File(new TextEncoder().encode(read("./lib/test/test_keyword.py")))],
                ["test_enum.py", new File(new TextEncoder().encode(read("./lib/test/test_enum.py")))],
                ["test_re.py", new File(new TextEncoder().encode(read("./lib/test/test_re.py")))],
                ["test_zoneinfo", new Directory([
                ["test_zoneinfo_property.py", new File(new TextEncoder().encode(read("./lib/test/test_zoneinfo/test_zoneinfo_property.py")))],
                ["data", new Directory([
                ["update_test_data.py", new File(new TextEncoder().encode(read("./lib/test/test_zoneinfo/data/update_test_data.py")))],
                ["zoneinfo_data.json", new File(new TextEncoder().encode(read("./lib/test/test_zoneinfo/data/zoneinfo_data.json")))],
                ])],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_zoneinfo/__main__.py")))],
                ["_support.py", new File(new TextEncoder().encode(read("./lib/test/test_zoneinfo/_support.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_zoneinfo/__init__.py")))],
                ["test_zoneinfo.py", new File(new TextEncoder().encode(read("./lib/test/test_zoneinfo/test_zoneinfo.py")))],
                ])],
                ["test_context.py", new File(new TextEncoder().encode(read("./lib/test/test_context.py")))],
                ["test_docxmlrpc.py", new File(new TextEncoder().encode(read("./lib/test/test_docxmlrpc.py")))],
                ["test_webbrowser.py", new File(new TextEncoder().encode(read("./lib/test/test_webbrowser.py")))],
                ["test_ast.py", new File(new TextEncoder().encode(read("./lib/test/test_ast.py")))],
                ["test_dict_version.py", new File(new TextEncoder().encode(read("./lib/test/test_dict_version.py")))],
                ["test_external_inspection.py", new File(new TextEncoder().encode(read("./lib/test/test_external_inspection.py")))],
                ["test_urlparse.py", new File(new TextEncoder().encode(read("./lib/test/test_urlparse.py")))],
                ["test_gdb", new Directory([
                ["test_pretty_print.py", new File(new TextEncoder().encode(read("./lib/test/test_gdb/test_pretty_print.py")))],
                ["test_cfunction.py", new File(new TextEncoder().encode(read("./lib/test/test_gdb/test_cfunction.py")))],
                ["gdb_sample.py", new File(new TextEncoder().encode(read("./lib/test/test_gdb/gdb_sample.py")))],
                ["test_backtrace.py", new File(new TextEncoder().encode(read("./lib/test/test_gdb/test_backtrace.py")))],
                ["test_cfunction_full.py", new File(new TextEncoder().encode(read("./lib/test/test_gdb/test_cfunction_full.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_gdb/__init__.py")))],
                ["util.py", new File(new TextEncoder().encode(read("./lib/test/test_gdb/util.py")))],
                ["test_misc.py", new File(new TextEncoder().encode(read("./lib/test/test_gdb/test_misc.py")))],
                ])],
                ["test_contains.py", new File(new TextEncoder().encode(read("./lib/test/test_contains.py")))],
                ["string_tests.py", new File(new TextEncoder().encode(read("./lib/test/string_tests.py")))],
                ["test_memoryio.py", new File(new TextEncoder().encode(read("./lib/test/test_memoryio.py")))],
                ["test_trace.py", new File(new TextEncoder().encode(read("./lib/test/test_trace.py")))],
                ["bisect_cmd.py", new File(new TextEncoder().encode(read("./lib/test/bisect_cmd.py")))],
                ["test_urllib_response.py", new File(new TextEncoder().encode(read("./lib/test/test_urllib_response.py")))],
                ["test_univnewlines.py", new File(new TextEncoder().encode(read("./lib/test/test_univnewlines.py")))],
                ["test_sax.py", new File(new TextEncoder().encode(read("./lib/test/test_sax.py")))],
                ["test_locale.py", new File(new TextEncoder().encode(read("./lib/test/test_locale.py")))],
                ["test_genericpath.py", new File(new TextEncoder().encode(read("./lib/test/test_genericpath.py")))],
                ["test_decimal.py", new File(new TextEncoder().encode(read("./lib/test/test_decimal.py")))],
                ["test_quopri.py", new File(new TextEncoder().encode(read("./lib/test/test_quopri.py")))],
                ["test_gc.py", new File(new TextEncoder().encode(read("./lib/test/test_gc.py")))],
                ["test_runpy.py", new File(new TextEncoder().encode(read("./lib/test/test_runpy.py")))],
                ["test_getpath.py", new File(new TextEncoder().encode(read("./lib/test/test_getpath.py")))],
                ["_test_atexit.py", new File(new TextEncoder().encode(read("./lib/test/_test_atexit.py")))],
                ["test_ctypes", new Directory([
                ["test_structures.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_structures.py")))],
                ["test_arrays.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_arrays.py")))],
                ["test_delattr.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_delattr.py")))],
                ["test_libc.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_libc.py")))],
                ["test_find.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_find.py")))],
                ["test_stringptr.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_stringptr.py")))],
                ["test_unaligned_structures.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_unaligned_structures.py")))],
                ["test_random_things.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_random_things.py")))],
                ["test_win32.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_win32.py")))],
                ["test_funcptr.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_funcptr.py")))],
                ["test_unicode.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_unicode.py")))],
                ["test_pep3118.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_pep3118.py")))],
                ["test_refcounts.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_refcounts.py")))],
                ["test_bitfields.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_bitfields.py")))],
                ["test_anon.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_anon.py")))],
                ["test_checkretval.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_checkretval.py")))],
                ["test_sizes.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_sizes.py")))],
                ["test_aligned_structures.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_aligned_structures.py")))],
                ["test_simplesubclasses.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_simplesubclasses.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/__main__.py")))],
                ["test_python_api.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_python_api.py")))],
                ["test_cast.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_cast.py")))],
                ["test_varsize_struct.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_varsize_struct.py")))],
                ["_support.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/_support.py")))],
                ["test_numbers.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_numbers.py")))],
                ["test_slicing.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_slicing.py")))],
                ["test_errno.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_errno.py")))],
                ["test_functions.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_functions.py")))],
                ["test_pickling.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_pickling.py")))],
                ["test_pointers.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_pointers.py")))],
                ["test_internals.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_internals.py")))],
                ["test_loading.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_loading.py")))],
                ["test_init.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_init.py")))],
                ["test_repr.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_repr.py")))],
                ["test_unions.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_unions.py")))],
                ["test_macholib.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_macholib.py")))],
                ["test_objects.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_objects.py")))],
                ["test_callbacks.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_callbacks.py")))],
                ["test_wintypes.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_wintypes.py")))],
                ["test_bytes.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_bytes.py")))],
                ["test_parameters.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_parameters.py")))],
                ["test_incomplete.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_incomplete.py")))],
                ["test_prototypes.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_prototypes.py")))],
                ["test_strings.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_strings.py")))],
                ["test_keeprefs.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_keeprefs.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/__init__.py")))],
                ["test_values.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_values.py")))],
                ["test_frombuffer.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_frombuffer.py")))],
                ["test_memfunctions.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_memfunctions.py")))],
                ["test_as_parameter.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_as_parameter.py")))],
                ["test_array_in_pointer.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_array_in_pointer.py")))],
                ["test_returnfuncptrs.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_returnfuncptrs.py")))],
                ["test_cfuncs.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_cfuncs.py")))],
                ["test_struct_fields.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_struct_fields.py")))],
                ["test_byteswap.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_byteswap.py")))],
                ["test_buffers.py", new File(new TextEncoder().encode(read("./lib/test/test_ctypes/test_buffers.py")))],
                ])],
                ["test_time.py", new File(new TextEncoder().encode(read("./lib/test/test_time.py")))],
                ["test_generated_cases.py", new File(new TextEncoder().encode(read("./lib/test/test_generated_cases.py")))],
                ["test_smtplib.py", new File(new TextEncoder().encode(read("./lib/test/test_smtplib.py")))],
                ["test_tempfile.py", new File(new TextEncoder().encode(read("./lib/test/test_tempfile.py")))],
                ["test_tools", new Directory([
                ["test_reindent.py", new File(new TextEncoder().encode(read("./lib/test/test_tools/test_reindent.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_tools/__main__.py")))],
                ["test_makeunicodedata.py", new File(new TextEncoder().encode(read("./lib/test/test_tools/test_makeunicodedata.py")))],
                ["test_freeze.py", new File(new TextEncoder().encode(read("./lib/test/test_tools/test_freeze.py")))],
                ["test_makefile.py", new File(new TextEncoder().encode(read("./lib/test/test_tools/test_makefile.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_tools/__init__.py")))],
                ["test_i18n.py", new File(new TextEncoder().encode(read("./lib/test/test_tools/test_i18n.py")))],
                ["test_sundry.py", new File(new TextEncoder().encode(read("./lib/test/test_tools/test_sundry.py")))],
                ])],
                ["test_dis.py", new File(new TextEncoder().encode(read("./lib/test/test_dis.py")))],
                ["test_threadsignals.py", new File(new TextEncoder().encode(read("./lib/test/test_threadsignals.py")))],
                ["test_pulldom.py", new File(new TextEncoder().encode(read("./lib/test/test_pulldom.py")))],
                ["test_picklebuffer.py", new File(new TextEncoder().encode(read("./lib/test/test_picklebuffer.py")))],
                ["test_decorators.py", new File(new TextEncoder().encode(read("./lib/test/test_decorators.py")))],
                ["test_fileio.py", new File(new TextEncoder().encode(read("./lib/test/test_fileio.py")))],
                ["test_iterlen.py", new File(new TextEncoder().encode(read("./lib/test/test_iterlen.py")))],
                ["test_hashlib.py", new File(new TextEncoder().encode(read("./lib/test/test_hashlib.py")))],
                ["test_launcher.py", new File(new TextEncoder().encode(read("./lib/test/test_launcher.py")))],
                ["test_reprlib.py", new File(new TextEncoder().encode(read("./lib/test/test_reprlib.py")))],
                ["test_fileutils.py", new File(new TextEncoder().encode(read("./lib/test/test_fileutils.py")))],
                ["test_coroutines.py", new File(new TextEncoder().encode(read("./lib/test/test_coroutines.py")))],
                ["test_mimetypes.py", new File(new TextEncoder().encode(read("./lib/test/test_mimetypes.py")))],
                ["test_charmapcodec.py", new File(new TextEncoder().encode(read("./lib/test/test_charmapcodec.py")))],
                ["mathdata", new Directory([
                ["cmath_testcases.txt", new File(new TextEncoder().encode(read("./lib/test/mathdata/cmath_testcases.txt")))],
                ["floating_points.txt", new File(new TextEncoder().encode(read("./lib/test/mathdata/floating_points.txt")))],
                ["formatfloat_testcases.txt", new File(new TextEncoder().encode(read("./lib/test/mathdata/formatfloat_testcases.txt")))],
                ["ieee754.txt", new File(new TextEncoder().encode(read("./lib/test/mathdata/ieee754.txt")))],
                ["math_testcases.txt", new File(new TextEncoder().encode(read("./lib/test/mathdata/math_testcases.txt")))],
                ])],
                ["test_ttk", new Directory([
                ["test_extensions.py", new File(new TextEncoder().encode(read("./lib/test/test_ttk/test_extensions.py")))],
                ["test_style.py", new File(new TextEncoder().encode(read("./lib/test/test_ttk/test_style.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_ttk/__main__.py")))],
                ["test_widgets.py", new File(new TextEncoder().encode(read("./lib/test/test_ttk/test_widgets.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_ttk/__init__.py")))],
                ])],
                ["_test_monitoring_shutdown.py", new File(new TextEncoder().encode(read("./lib/test/_test_monitoring_shutdown.py")))],
                ["_test_eintr.py", new File(new TextEncoder().encode(read("./lib/test/_test_eintr.py")))],
                ["test_operator.py", new File(new TextEncoder().encode(read("./lib/test/test_operator.py")))],
                ["test_perf_profiler.py", new File(new TextEncoder().encode(read("./lib/test/test_perf_profiler.py")))],
                ["reperf.py", new File(new TextEncoder().encode(read("./lib/test/reperf.py")))],
                ["test_ordered_dict.py", new File(new TextEncoder().encode(read("./lib/test/test_ordered_dict.py")))],
                ["test_sysconfig.py", new File(new TextEncoder().encode(read("./lib/test/test_sysconfig.py")))],
                ["test_hmac.py", new File(new TextEncoder().encode(read("./lib/test/test_hmac.py")))],
                ["ssltests.py", new File(new TextEncoder().encode(read("./lib/test/ssltests.py")))],
                ["test_unicodedata.py", new File(new TextEncoder().encode(read("./lib/test/test_unicodedata.py")))],
                ["test_sys_setprofile.py", new File(new TextEncoder().encode(read("./lib/test/test_sys_setprofile.py")))],
                ["test_exceptions.py", new File(new TextEncoder().encode(read("./lib/test/test_exceptions.py")))],
                ["test_logging.py", new File(new TextEncoder().encode(read("./lib/test/test_logging.py")))],
                ["test_pydoc", new Directory([
                ["test_pydoc.py", new File(new TextEncoder().encode(read("./lib/test/test_pydoc/test_pydoc.py")))],
                ["pydocfodder.py", new File(new TextEncoder().encode(read("./lib/test/test_pydoc/pydocfodder.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_pydoc/__init__.py")))],
                ["pydoc_mod.py", new File(new TextEncoder().encode(read("./lib/test/test_pydoc/pydoc_mod.py")))],
                ])],
                ["test_weakref.py", new File(new TextEncoder().encode(read("./lib/test/test_weakref.py")))],
                ["test_frozen.py", new File(new TextEncoder().encode(read("./lib/test/test_frozen.py")))],
                ["empty.vbs", new File(new TextEncoder().encode(read("./lib/test/empty.vbs")))],
                ["test_modulefinder.py", new File(new TextEncoder().encode(read("./lib/test/test_modulefinder.py")))],
                ["test_openpty.py", new File(new TextEncoder().encode(read("./lib/test/test_openpty.py")))],
                ["test_base64.py", new File(new TextEncoder().encode(read("./lib/test/test_base64.py")))],
                ["test_mmap.py", new File(new TextEncoder().encode(read("./lib/test/test_mmap.py")))],
                ["test_peepholer.py", new File(new TextEncoder().encode(read("./lib/test/test_peepholer.py")))],
                ["test_cppext", new Directory([
                ["setup.py", new File(new TextEncoder().encode(read("./lib/test/test_cppext/setup.py")))],
                ["extension.cpp", new File(new TextEncoder().encode(read("./lib/test/test_cppext/extension.cpp")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_cppext/__init__.py")))],
                ])],
                ["test_zipfile", new Directory([
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_zipfile/__main__.py")))],
                ["test_core.py", new File(new TextEncoder().encode(read("./lib/test/test_zipfile/test_core.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_zipfile/__init__.py")))],
                ["_path", new Directory([
                ["_test_params.py", new File(new TextEncoder().encode(read("./lib/test/test_zipfile/_path/_test_params.py")))],
                ["_support.py", new File(new TextEncoder().encode(read("./lib/test/test_zipfile/_path/_support.py")))],
                ["write-alpharep.py", new File(new TextEncoder().encode(read("./lib/test/test_zipfile/_path/write-alpharep.py")))],
                ["_functools.py", new File(new TextEncoder().encode(read("./lib/test/test_zipfile/_path/_functools.py")))],
                ["test_path.py", new File(new TextEncoder().encode(read("./lib/test/test_zipfile/_path/test_path.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_zipfile/_path/__init__.py")))],
                ["test_complexity.py", new File(new TextEncoder().encode(read("./lib/test/test_zipfile/_path/test_complexity.py")))],
                ["_itertools.py", new File(new TextEncoder().encode(read("./lib/test/test_zipfile/_path/_itertools.py")))],
                ])],
                ])],
                ["list_tests.py", new File(new TextEncoder().encode(read("./lib/test/list_tests.py")))],
                ["test_turtle.py", new File(new TextEncoder().encode(read("./lib/test/test_turtle.py")))],
                ["test_descr.py", new File(new TextEncoder().encode(read("./lib/test/test_descr.py")))],
                ["encoded_modules", new Directory([
                ["module_koi8_r.py", new File(new TextEncoder().encode(read("./lib/test/encoded_modules/module_koi8_r.py")))],
                ["module_iso_8859_1.py", new File(new TextEncoder().encode(read("./lib/test/encoded_modules/module_iso_8859_1.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/encoded_modules/__init__.py")))],
                ])],
                ["test_unary.py", new File(new TextEncoder().encode(read("./lib/test/test_unary.py")))],
                ["test_fork1.py", new File(new TextEncoder().encode(read("./lib/test/test_fork1.py")))],
                ["test_cext", new Directory([
                ["extension.c", new File(new TextEncoder().encode(read("./lib/test/test_cext/extension.c")))],
                ["setup.py", new File(new TextEncoder().encode(read("./lib/test/test_cext/setup.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_cext/__init__.py")))],
                ])],
                ["relimport.py", new File(new TextEncoder().encode(read("./lib/test/relimport.py")))],
                ["test_posixpath.py", new File(new TextEncoder().encode(read("./lib/test/test_posixpath.py")))],
                ["test_tty.py", new File(new TextEncoder().encode(read("./lib/test/test_tty.py")))],
                ["test_dbm.py", new File(new TextEncoder().encode(read("./lib/test/test_dbm.py")))],
                ["test_global.py", new File(new TextEncoder().encode(read("./lib/test/test_global.py")))],
                ["test_str.py", new File(new TextEncoder().encode(read("./lib/test/test_str.py")))],
                ["test_generator_stop.py", new File(new TextEncoder().encode(read("./lib/test/test_generator_stop.py")))],
                ["test_profile.py", new File(new TextEncoder().encode(read("./lib/test/test_profile.py")))],
                ["test_getopt.py", new File(new TextEncoder().encode(read("./lib/test/test_getopt.py")))],
                ["lock_tests.py", new File(new TextEncoder().encode(read("./lib/test/lock_tests.py")))],
                ["test_isinstance.py", new File(new TextEncoder().encode(read("./lib/test/test_isinstance.py")))],
                ["libregrtest", new Directory([
                ["filter.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/filter.py")))],
                ["pgo.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/pgo.py")))],
                ["findtests.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/findtests.py")))],
                ["main.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/main.py")))],
                ["save_env.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/save_env.py")))],
                ["results.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/results.py")))],
                ["win_utils.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/win_utils.py")))],
                ["mypy.ini", new File(new TextEncoder().encode(read("./lib/test/libregrtest/mypy.ini")))],
                ["setup.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/setup.py")))],
                ["cmdline.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/cmdline.py")))],
                ["run_workers.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/run_workers.py")))],
                ["utils.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/utils.py")))],
                ["worker.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/worker.py")))],
                ["testresult.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/testresult.py")))],
                ["tsan.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/tsan.py")))],
                ["single.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/single.py")))],
                ["result.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/result.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/__init__.py")))],
                ["runtests.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/runtests.py")))],
                ["logger.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/logger.py")))],
                ["refleak.py", new File(new TextEncoder().encode(read("./lib/test/libregrtest/refleak.py")))],
                ])],
                ["test_monitoring.py", new File(new TextEncoder().encode(read("./lib/test/test_monitoring.py")))],
                ["test_tokenize.py", new File(new TextEncoder().encode(read("./lib/test/test_tokenize.py")))],
                ["test_dynamic.py", new File(new TextEncoder().encode(read("./lib/test/test_dynamic.py")))],
                ["pythoninfo.py", new File(new TextEncoder().encode(read("./lib/test/pythoninfo.py")))],
                ["test_py_compile.py", new File(new TextEncoder().encode(read("./lib/test/test_py_compile.py")))],
                ["test_unpack.py", new File(new TextEncoder().encode(read("./lib/test/test_unpack.py")))],
                ["test_regrtest.py", new File(new TextEncoder().encode(read("./lib/test/test_regrtest.py")))],
                ["test_abstract_numbers.py", new File(new TextEncoder().encode(read("./lib/test/test_abstract_numbers.py")))],
                ["test_generators.py", new File(new TextEncoder().encode(read("./lib/test/test_generators.py")))],
                ["test_mailbox.py", new File(new TextEncoder().encode(read("./lib/test/test_mailbox.py")))],
                ["test_marshal.py", new File(new TextEncoder().encode(read("./lib/test/test_marshal.py")))],
                ["test_thread.py", new File(new TextEncoder().encode(read("./lib/test/test_thread.py")))],
                ["test_importlib", new Directory([
                ["abc.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/abc.py")))],
                ["extension", new Directory([
                ["test_loader.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/extension/test_loader.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/extension/__main__.py")))],
                ["test_path_hook.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/extension/test_path_hook.py")))],
                ["test_case_sensitivity.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/extension/test_case_sensitivity.py")))],
                ["test_finder.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/extension/test_finder.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/extension/__init__.py")))],
                ])],
                ["resources", new Directory([
                ["test_open.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/test_open.py")))],
                ["zipdata01", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/zipdata01/__init__.py")))],
                ["ziptestdata.zip", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/zipdata01/ziptestdata.zip")))],
                ])],
                ["update-zips.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/update-zips.py")))],
                ["test_custom.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/test_custom.py")))],
                ["data01", new Directory([
                ["utf-8.file", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data01/utf-8.file")))],
                ["subdirectory", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data01/subdirectory/__init__.py")))],
                ["binary.file", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data01/subdirectory/binary.file")))],
                ])],
                ["utf-16.file", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data01/utf-16.file")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data01/__init__.py")))],
                ["binary.file", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data01/binary.file")))],
                ])],
                ["test_files.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/test_files.py")))],
                ["zipdata02", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/zipdata02/__init__.py")))],
                ["ziptestdata.zip", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/zipdata02/ziptestdata.zip")))],
                ])],
                ["test_read.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/test_read.py")))],
                ["_path.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/_path.py")))],
                ["test_path.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/test_path.py")))],
                ["data02", new Directory([
                ["two", new Directory([
                ["resource2.txt", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data02/two/resource2.txt")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data02/two/__init__.py")))],
                ])],
                ["subdirectory", new Directory([
                ["subsubdir", new Directory([
                ["resource.txt", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data02/subdirectory/subsubdir/resource.txt")))],
                ])],
                ])],
                ["one", new Directory([
                ["resource1.txt", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data02/one/resource1.txt")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data02/one/__init__.py")))],
                ])],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data02/__init__.py")))],
                ])],
                ["test_contents.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/test_contents.py")))],
                ["test_compatibilty_files.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/test_compatibilty_files.py")))],
                ["data03", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data03/__init__.py")))],
                ["namespace", new Directory([
                ["portion2", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data03/namespace/portion2/__init__.py")))],
                ])],
                ["resource1.txt", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data03/namespace/resource1.txt")))],
                ["portion1", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/data03/namespace/portion1/__init__.py")))],
                ])],
                ])],
                ])],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/__init__.py")))],
                ["test_functional.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/test_functional.py")))],
                ["namespacedata01", new Directory([
                ["utf-8.file", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/namespacedata01/utf-8.file")))],
                ["utf-16.file", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/namespacedata01/utf-16.file")))],
                ["binary.file", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/namespacedata01/binary.file")))],
                ])],
                ["util.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/util.py")))],
                ["test_reader.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/test_reader.py")))],
                ["test_resource.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/resources/test_resource.py")))],
                ])],
                ["threaded_import_hangers.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/threaded_import_hangers.py")))],
                ["test_util.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/test_util.py")))],
                ["test_lazy.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/test_lazy.py")))],
                ["test_threaded_import.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/test_threaded_import.py")))],
                ["test_api.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/test_api.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/__main__.py")))],
                ["test_spec.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/test_spec.py")))],
                ["metadata", new Directory([
                ["stubs.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/stubs.py")))],
                ["fixtures.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/fixtures.py")))],
                ["test_zip.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/test_zip.py")))],
                ["test_api.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/test_api.py")))],
                ["data", new Directory([
                ["example-21.12-py3.6.egg", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/data/example-21.12-py3.6.egg")))],
                ["example-21.12-py3-none-any.whl", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/data/example-21.12-py3-none-any.whl")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/data/__init__.py")))],
                ["example2-1.0.0-py3-none-any.whl", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/data/example2-1.0.0-py3-none-any.whl")))],
                ["sources", new Directory([
                ["example2", new Directory([
                ["pyproject.toml", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/data/sources/example2/pyproject.toml")))],
                ["example2", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/data/sources/example2/example2/__init__.py")))],
                ])],
                ])],
                ["example", new Directory([
                ["setup.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/data/sources/example/setup.py")))],
                ["example", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/data/sources/example/example/__init__.py")))],
                ])],
                ])],
                ])],
                ])],
                ["_path.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/_path.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/__init__.py")))],
                ["test_main.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/test_main.py")))],
                ["_context.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/metadata/_context.py")))],
                ])],
                ["test_namespace_pkgs.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/test_namespace_pkgs.py")))],
                ["frozen", new Directory([
                ["test_loader.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/frozen/test_loader.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/frozen/__main__.py")))],
                ["test_finder.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/frozen/test_finder.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/frozen/__init__.py")))],
                ])],
                ["source", new Directory([
                ["test_file_loader.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/source/test_file_loader.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/source/__main__.py")))],
                ["test_path_hook.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/source/test_path_hook.py")))],
                ["test_case_sensitivity.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/source/test_case_sensitivity.py")))],
                ["test_finder.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/source/test_finder.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/source/__init__.py")))],
                ["test_source_encoding.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/source/test_source_encoding.py")))],
                ])],
                ["import_", new Directory([
                ["test___loader__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/import_/test___loader__.py")))],
                ["test_caching.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/import_/test_caching.py")))],
                ["test_packages.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/import_/test_packages.py")))],
                ["test_api.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/import_/test_api.py")))],
                ["test___package__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/import_/test___package__.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/import_/__main__.py")))],
                ["test_fromlist.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/import_/test_fromlist.py")))],
                ["test_relative_imports.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/import_/test_relative_imports.py")))],
                ["test_helpers.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/import_/test_helpers.py")))],
                ["test_path.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/import_/test_path.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/import_/__init__.py")))],
                ["test_meta_path.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/import_/test_meta_path.py")))],
                ])],
                ["test_locks.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/test_locks.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/__init__.py")))],
                ["partial", new Directory([
                ["pool_in_threads.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/partial/pool_in_threads.py")))],
                ["cfimport.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/partial/cfimport.py")))],
                ])],
                ["test_abc.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/test_abc.py")))],
                ["builtin", new Directory([
                ["test_loader.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/builtin/test_loader.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/builtin/__main__.py")))],
                ["test_finder.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/builtin/test_finder.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/builtin/__init__.py")))],
                ])],
                ["util.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/util.py")))],
                ["namespace_pkgs", new Directory([
                ["both_portions", new Directory([
                ["foo", new Directory([
                ["two.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/both_portions/foo/two.py")))],
                ["one.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/both_portions/foo/one.py")))],
                ])],
                ])],
                ["portion2", new Directory([
                ["foo", new Directory([
                ["two.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/portion2/foo/two.py")))],
                ])],
                ])],
                ["missing_directory.zip", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/missing_directory.zip")))],
                ["nested_portion1.zip", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/nested_portion1.zip")))],
                ["top_level_portion1.zip", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/top_level_portion1.zip")))],
                ["portion1", new Directory([
                ["foo", new Directory([
                ["one.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/portion1/foo/one.py")))],
                ])],
                ])],
                ["module_and_namespace_package", new Directory([
                ["a_test.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/module_and_namespace_package/a_test.py")))],
                ["a_test", new Directory([
                ["empty", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/module_and_namespace_package/a_test/empty")))],
                ])],
                ])],
                ["project1", new Directory([
                ["parent", new Directory([
                ["child", new Directory([
                ["one.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/project1/parent/child/one.py")))],
                ])],
                ])],
                ])],
                ["project2", new Directory([
                ["parent", new Directory([
                ["child", new Directory([
                ["two.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/project2/parent/child/two.py")))],
                ])],
                ])],
                ])],
                ["not_a_namespace_pkg", new Directory([
                ["foo", new Directory([
                ["one.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/not_a_namespace_pkg/foo/one.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/not_a_namespace_pkg/foo/__init__.py")))],
                ])],
                ])],
                ["project3", new Directory([
                ["parent", new Directory([
                ["child", new Directory([
                ["three.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/namespace_pkgs/project3/parent/child/three.py")))],
                ])],
                ])],
                ])],
                ])],
                ["test_pkg_import.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/test_pkg_import.py")))],
                ["test_windows.py", new File(new TextEncoder().encode(read("./lib/test/test_importlib/test_windows.py")))],
                ])],
                ["test_ioctl.py", new File(new TextEncoder().encode(read("./lib/test/test_ioctl.py")))],
                ["test_filecmp.py", new File(new TextEncoder().encode(read("./lib/test/test_filecmp.py")))],
                ["test_zipfile64.py", new File(new TextEncoder().encode(read("./lib/test/test_zipfile64.py")))],
                ["test_syslog.py", new File(new TextEncoder().encode(read("./lib/test/test_syslog.py")))],
                ["test_repl.py", new File(new TextEncoder().encode(read("./lib/test/test_repl.py")))],
                ["test_sys_settrace.py", new File(new TextEncoder().encode(read("./lib/test/test_sys_settrace.py")))],
                ["test_unicode_identifiers.py", new File(new TextEncoder().encode(read("./lib/test/test_unicode_identifiers.py")))],
                ["test_tabnanny.py", new File(new TextEncoder().encode(read("./lib/test/test_tabnanny.py")))],
                ["test_curses.py", new File(new TextEncoder().encode(read("./lib/test/test_curses.py")))],
                ["test_httpservers.py", new File(new TextEncoder().encode(read("./lib/test/test_httpservers.py")))],
                ["test_io.py", new File(new TextEncoder().encode(read("./lib/test/test_io.py")))],
                ["test_bytes.py", new File(new TextEncoder().encode(read("./lib/test/test_bytes.py")))],
                ["mp_preload.py", new File(new TextEncoder().encode(read("./lib/test/mp_preload.py")))],
                ["test_contextlib.py", new File(new TextEncoder().encode(read("./lib/test/test_contextlib.py")))],
                ["test_yield_from.py", new File(new TextEncoder().encode(read("./lib/test/test_yield_from.py")))],
                ["test_userlist.py", new File(new TextEncoder().encode(read("./lib/test/test_userlist.py")))],
                ["audit-tests.py", new File(new TextEncoder().encode(read("./lib/test/audit-tests.py")))],
                ["test_strtod.py", new File(new TextEncoder().encode(read("./lib/test/test_strtod.py")))],
                ["test_clinic.py", new File(new TextEncoder().encode(read("./lib/test/test_clinic.py")))],
                ["test_math.py", new File(new TextEncoder().encode(read("./lib/test/test_math.py")))],
                ["test_code.py", new File(new TextEncoder().encode(read("./lib/test/test_code.py")))],
                ["test_urllib2_localnet.py", new File(new TextEncoder().encode(read("./lib/test/test_urllib2_localnet.py")))],
                ["test_iter.py", new File(new TextEncoder().encode(read("./lib/test/test_iter.py")))],
                ["test_kqueue.py", new File(new TextEncoder().encode(read("./lib/test/test_kqueue.py")))],
                ["xmltestdata", new Directory([
                ["simple.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/simple.xml")))],
                ["c14n-20", new Directory([
                ["out_inC14N5_c14nTrim.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inC14N5_c14nTrim.xml")))],
                ["inNsDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inNsDefault.xml")))],
                ["out_inC14N2_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inC14N2_c14nDefault.xml")))],
                ["out_inC14N1_c14nComment.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inC14N1_c14nComment.xml")))],
                ["out_inNsContent_c14nQnameXpathElem.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsContent_c14nQnameXpathElem.xml")))],
                ["out_inNsRedecl_c14nPrefix.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsRedecl_c14nPrefix.xml")))],
                ["c14nPrefix.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/c14nPrefix.xml")))],
                ["out_inNsSuperfluous_c14nPrefix.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsSuperfluous_c14nPrefix.xml")))],
                ["out_inNsXml_c14nQname.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsXml_c14nQname.xml")))],
                ["world.txt", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/world.txt")))],
                ["out_inC14N3_c14nPrefix.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inC14N3_c14nPrefix.xml")))],
                ["out_inC14N3_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inC14N3_c14nDefault.xml")))],
                ["out_inC14N2_c14nTrim.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inC14N2_c14nTrim.xml")))],
                ["inC14N5.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inC14N5.xml")))],
                ["out_inNsSort_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsSort_c14nDefault.xml")))],
                ["out_inC14N5_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inC14N5_c14nDefault.xml")))],
                ["c14nTrim.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/c14nTrim.xml")))],
                ["inNsPushdown.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inNsPushdown.xml")))],
                ["inC14N6.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inC14N6.xml")))],
                ["c14nQnameElem.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/c14nQnameElem.xml")))],
                ["c14nQname.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/c14nQname.xml")))],
                ["c14nPrefixQname.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/c14nPrefixQname.xml")))],
                ["out_inNsDefault_c14nPrefix.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsDefault_c14nPrefix.xml")))],
                ["inC14N4.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inC14N4.xml")))],
                ["out_inNsSort_c14nPrefix.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsSort_c14nPrefix.xml")))],
                ["out_inNsSuperfluous_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsSuperfluous_c14nDefault.xml")))],
                ["out_inNsXml_c14nPrefix.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsXml_c14nPrefix.xml")))],
                ["out_inNsContent_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsContent_c14nDefault.xml")))],
                ["c14nPrefixQnameXpathElem.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/c14nPrefixQnameXpathElem.xml")))],
                ["README", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/README")))],
                ["inNsSort.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inNsSort.xml")))],
                ["out_inNsXml_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsXml_c14nDefault.xml")))],
                ["inC14N1.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inC14N1.xml")))],
                ["inNsSuperfluous.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inNsSuperfluous.xml")))],
                ["inC14N2.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inC14N2.xml")))],
                ["out_inNsRedecl_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsRedecl_c14nDefault.xml")))],
                ["out_inC14N4_c14nTrim.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inC14N4_c14nTrim.xml")))],
                ["c14nComment.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/c14nComment.xml")))],
                ["doc.dtd", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/doc.dtd")))],
                ["c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/c14nDefault.xml")))],
                ["out_inC14N6_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inC14N6_c14nDefault.xml")))],
                ["out_inNsContent_c14nQnameElem.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsContent_c14nQnameElem.xml")))],
                ["inNsXml.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inNsXml.xml")))],
                ["out_inC14N3_c14nTrim.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inC14N3_c14nTrim.xml")))],
                ["out_inNsXml_c14nPrefixQname.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsXml_c14nPrefixQname.xml")))],
                ["out_inNsDefault_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsDefault_c14nDefault.xml")))],
                ["out_inNsContent_c14nPrefixQnameXpathElem.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsContent_c14nPrefixQnameXpathElem.xml")))],
                ["out_inC14N1_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inC14N1_c14nDefault.xml")))],
                ["inNsRedecl.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inNsRedecl.xml")))],
                ["out_inNsPushdown_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsPushdown_c14nDefault.xml")))],
                ["c14nQnameXpathElem.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/c14nQnameXpathElem.xml")))],
                ["doc.xsl", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/doc.xsl")))],
                ["inNsContent.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inNsContent.xml")))],
                ["inC14N3.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/inC14N3.xml")))],
                ["out_inC14N4_c14nDefault.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inC14N4_c14nDefault.xml")))],
                ["out_inNsPushdown_c14nPrefix.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/c14n-20/out_inNsPushdown_c14nPrefix.xml")))],
                ])],
                ["expat224_utf8_bug.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/expat224_utf8_bug.xml")))],
                ["simple-ns.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/simple-ns.xml")))],
                ["test.xml.out", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/test.xml.out")))],
                ["test.xml", new File(new TextEncoder().encode(read("./lib/test/xmltestdata/test.xml")))],
                ])],
                ["test_types.py", new File(new TextEncoder().encode(read("./lib/test/test_types.py")))],
                ["test_binascii.py", new File(new TextEncoder().encode(read("./lib/test/test_binascii.py")))],
                ["test_xmlrpc.py", new File(new TextEncoder().encode(read("./lib/test/test_xmlrpc.py")))],
                ["datetimetester.py", new File(new TextEncoder().encode(read("./lib/test/datetimetester.py")))],
                ["test_poplib.py", new File(new TextEncoder().encode(read("./lib/test/test_poplib.py")))],
                ["test_http_cookies.py", new File(new TextEncoder().encode(read("./lib/test/test_http_cookies.py")))],
                ["test_string.py", new File(new TextEncoder().encode(read("./lib/test/test_string.py")))],
                ["test_codecencodings_kr.py", new File(new TextEncoder().encode(read("./lib/test/test_codecencodings_kr.py")))],
                ["test_symtable.py", new File(new TextEncoder().encode(read("./lib/test/test_symtable.py")))],
                ["test_sched.py", new File(new TextEncoder().encode(read("./lib/test/test_sched.py")))],
                ["test_platform.py", new File(new TextEncoder().encode(read("./lib/test/test_platform.py")))],
                ["test_pep646_syntax.py", new File(new TextEncoder().encode(read("./lib/test/test_pep646_syntax.py")))],
                ["test_glob.py", new File(new TextEncoder().encode(read("./lib/test/test_glob.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/__init__.py")))],
                ["test_grammar.py", new File(new TextEncoder().encode(read("./lib/test/test_grammar.py")))],
                ["test_secrets.py", new File(new TextEncoder().encode(read("./lib/test/test_secrets.py")))],
                ["test_type_aliases.py", new File(new TextEncoder().encode(read("./lib/test/test_type_aliases.py")))],
                ["test_msvcrt.py", new File(new TextEncoder().encode(read("./lib/test/test_msvcrt.py")))],
                ["test_compileall.py", new File(new TextEncoder().encode(read("./lib/test/test_compileall.py")))],
                ["test_future_stmt", new Directory([
                ["test_future_multiple_features.py", new File(new TextEncoder().encode(read("./lib/test/test_future_stmt/test_future_multiple_features.py")))],
                ["test_future_flags.py", new File(new TextEncoder().encode(read("./lib/test/test_future_stmt/test_future_flags.py")))],
                ["test_future_single_import.py", new File(new TextEncoder().encode(read("./lib/test/test_future_stmt/test_future_single_import.py")))],
                ["test_future_multiple_imports.py", new File(new TextEncoder().encode(read("./lib/test/test_future_stmt/test_future_multiple_imports.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_future_stmt/__init__.py")))],
                ["nested_scope.py", new File(new TextEncoder().encode(read("./lib/test/test_future_stmt/nested_scope.py")))],
                ["badsyntax_future.py", new File(new TextEncoder().encode(read("./lib/test/test_future_stmt/badsyntax_future.py")))],
                ["test_future.py", new File(new TextEncoder().encode(read("./lib/test/test_future_stmt/test_future.py")))],
                ["import_nested_scope_twice.py", new File(new TextEncoder().encode(read("./lib/test/test_future_stmt/import_nested_scope_twice.py")))],
                ])],
                ["test_socketserver.py", new File(new TextEncoder().encode(read("./lib/test/test_socketserver.py")))],
                ["test_concurrent_futures", new Directory([
                ["test_as_completed.py", new File(new TextEncoder().encode(read("./lib/test/test_concurrent_futures/test_as_completed.py")))],
                ["test_deadlock.py", new File(new TextEncoder().encode(read("./lib/test/test_concurrent_futures/test_deadlock.py")))],
                ["test_shutdown.py", new File(new TextEncoder().encode(read("./lib/test/test_concurrent_futures/test_shutdown.py")))],
                ["test_wait.py", new File(new TextEncoder().encode(read("./lib/test/test_concurrent_futures/test_wait.py")))],
                ["test_thread_pool.py", new File(new TextEncoder().encode(read("./lib/test/test_concurrent_futures/test_thread_pool.py")))],
                ["executor.py", new File(new TextEncoder().encode(read("./lib/test/test_concurrent_futures/executor.py")))],
                ["test_process_pool.py", new File(new TextEncoder().encode(read("./lib/test/test_concurrent_futures/test_process_pool.py")))],
                ["test_init.py", new File(new TextEncoder().encode(read("./lib/test/test_concurrent_futures/test_init.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_concurrent_futures/__init__.py")))],
                ["util.py", new File(new TextEncoder().encode(read("./lib/test/test_concurrent_futures/util.py")))],
                ["test_future.py", new File(new TextEncoder().encode(read("./lib/test/test_concurrent_futures/test_future.py")))],
                ])],
                ["xmltests.py", new File(new TextEncoder().encode(read("./lib/test/xmltests.py")))],
                ["test_string_literals.py", new File(new TextEncoder().encode(read("./lib/test/test_string_literals.py")))],
                ["test_tarfile.py", new File(new TextEncoder().encode(read("./lib/test/test_tarfile.py")))],
                ["test_dataclasses", new Directory([
                ["dataclass_module_2.py", new File(new TextEncoder().encode(read("./lib/test/test_dataclasses/dataclass_module_2.py")))],
                ["dataclass_textanno.py", new File(new TextEncoder().encode(read("./lib/test/test_dataclasses/dataclass_textanno.py")))],
                ["dataclass_module_1_str.py", new File(new TextEncoder().encode(read("./lib/test/test_dataclasses/dataclass_module_1_str.py")))],
                ["dataclass_module_1.py", new File(new TextEncoder().encode(read("./lib/test/test_dataclasses/dataclass_module_1.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_dataclasses/__init__.py")))],
                ["dataclass_module_2_str.py", new File(new TextEncoder().encode(read("./lib/test/test_dataclasses/dataclass_module_2_str.py")))],
                ])],
                ["cjkencodings", new Directory([
                ["shift_jis.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/shift_jis.txt")))],
                ["euc_kr-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/euc_kr-utf8.txt")))],
                ["euc_jp-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/euc_jp-utf8.txt")))],
                ["shift_jis-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/shift_jis-utf8.txt")))],
                ["gb18030.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/gb18030.txt")))],
                ["gb18030-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/gb18030-utf8.txt")))],
                ["shift_jisx0213.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/shift_jisx0213.txt")))],
                ["big5.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/big5.txt")))],
                ["iso2022_jp-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/iso2022_jp-utf8.txt")))],
                ["euc_jisx0213.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/euc_jisx0213.txt")))],
                ["cp949-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/cp949-utf8.txt")))],
                ["euc_kr.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/euc_kr.txt")))],
                ["cp949.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/cp949.txt")))],
                ["gb2312-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/gb2312-utf8.txt")))],
                ["euc_jp.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/euc_jp.txt")))],
                ["big5hkscs-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/big5hkscs-utf8.txt")))],
                ["hz.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/hz.txt")))],
                ["johab-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/johab-utf8.txt")))],
                ["hz-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/hz-utf8.txt")))],
                ["iso2022_kr.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/iso2022_kr.txt")))],
                ["big5-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/big5-utf8.txt")))],
                ["gbk-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/gbk-utf8.txt")))],
                ["euc_jisx0213-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/euc_jisx0213-utf8.txt")))],
                ["big5hkscs.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/big5hkscs.txt")))],
                ["gb2312.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/gb2312.txt")))],
                ["johab.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/johab.txt")))],
                ["gbk.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/gbk.txt")))],
                ["iso2022_jp.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/iso2022_jp.txt")))],
                ["shift_jisx0213-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/shift_jisx0213-utf8.txt")))],
                ["iso2022_kr-utf8.txt", new File(new TextEncoder().encode(read("./lib/test/cjkencodings/iso2022_kr-utf8.txt")))],
                ])],
                ["test_os.py", new File(new TextEncoder().encode(read("./lib/test/test_os.py")))],
                ["test_unicode_file_functions.py", new File(new TextEncoder().encode(read("./lib/test/test_unicode_file_functions.py")))],
                ["test_posix.py", new File(new TextEncoder().encode(read("./lib/test/test_posix.py")))],
                ["test_baseexception.py", new File(new TextEncoder().encode(read("./lib/test/test_baseexception.py")))],
                ["test_compiler_assemble.py", new File(new TextEncoder().encode(read("./lib/test/test_compiler_assemble.py")))],
                ["test_optimizer.py", new File(new TextEncoder().encode(read("./lib/test/test_optimizer.py")))],
                ["test_subprocess.py", new File(new TextEncoder().encode(read("./lib/test/test_subprocess.py")))],
                ["test_float.py", new File(new TextEncoder().encode(read("./lib/test/test_float.py")))],
                ["mock_socket.py", new File(new TextEncoder().encode(read("./lib/test/mock_socket.py")))],
                ["test_robotparser.py", new File(new TextEncoder().encode(read("./lib/test/test_robotparser.py")))],
                ["test_popen.py", new File(new TextEncoder().encode(read("./lib/test/test_popen.py")))],
                ["test_except_star.py", new File(new TextEncoder().encode(read("./lib/test/test_except_star.py")))],
                ["test_codecmaps_hk.py", new File(new TextEncoder().encode(read("./lib/test/test_codecmaps_hk.py")))],
                ["test_structseq.py", new File(new TextEncoder().encode(read("./lib/test/test_structseq.py")))],
                ["test_multiprocessing_fork", new Directory([
                ["test_threads.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_fork/test_threads.py")))],
                ["test_processes.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_fork/test_processes.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_fork/__init__.py")))],
                ["test_manager.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_fork/test_manager.py")))],
                ["test_misc.py", new File(new TextEncoder().encode(read("./lib/test/test_multiprocessing_fork/test_misc.py")))],
                ])],
                ["test_buffer.py", new File(new TextEncoder().encode(read("./lib/test/test_buffer.py")))],
                ["test_genericalias.py", new File(new TextEncoder().encode(read("./lib/test/test_genericalias.py")))],
                ["test_numeric_tower.py", new File(new TextEncoder().encode(read("./lib/test/test_numeric_tower.py")))],
                ["signalinterproctester.py", new File(new TextEncoder().encode(read("./lib/test/signalinterproctester.py")))],
                ["test_pickle.py", new File(new TextEncoder().encode(read("./lib/test/test_pickle.py")))],
                ["mp_fork_bomb.py", new File(new TextEncoder().encode(read("./lib/test/mp_fork_bomb.py")))],
                ["test_abc.py", new File(new TextEncoder().encode(read("./lib/test/test_abc.py")))],
                ["archivetestdata", new Directory([
                ["testtar.tar", new File(new TextEncoder().encode(read("./lib/test/archivetestdata/testtar.tar")))],
                ["testtar.tar.xz", new File(new TextEncoder().encode(read("./lib/test/archivetestdata/testtar.tar.xz")))],
                ["exe_with_z64", new File(new TextEncoder().encode(read("./lib/test/archivetestdata/exe_with_z64")))],
                ["header.sh", new File(new TextEncoder().encode(read("./lib/test/archivetestdata/header.sh")))],
                ["testdata_module_inside_zip.py", new File(new TextEncoder().encode(read("./lib/test/archivetestdata/testdata_module_inside_zip.py")))],
                ["zipdir_backslash.zip", new File(new TextEncoder().encode(read("./lib/test/archivetestdata/zipdir_backslash.zip")))],
                ["README.md", new File(new TextEncoder().encode(read("./lib/test/archivetestdata/README.md")))],
                ["zip_cp437_header.zip", new File(new TextEncoder().encode(read("./lib/test/archivetestdata/zip_cp437_header.zip")))],
                ["exe_with_zip", new File(new TextEncoder().encode(read("./lib/test/archivetestdata/exe_with_zip")))],
                ["recursion.tar", new File(new TextEncoder().encode(read("./lib/test/archivetestdata/recursion.tar")))],
                ["zipdir.zip", new File(new TextEncoder().encode(read("./lib/test/archivetestdata/zipdir.zip")))],
                ])],
                ["test_fcntl.py", new File(new TextEncoder().encode(read("./lib/test/test_fcntl.py")))],
                ["test_positional_only_arg.py", new File(new TextEncoder().encode(read("./lib/test/test_positional_only_arg.py")))],
                ["re_tests.py", new File(new TextEncoder().encode(read("./lib/test/re_tests.py")))],
                ["test_fileinput.py", new File(new TextEncoder().encode(read("./lib/test/test_fileinput.py")))],
                ["test_typechecks.py", new File(new TextEncoder().encode(read("./lib/test/test_typechecks.py")))],
                ["test_gzip.py", new File(new TextEncoder().encode(read("./lib/test/test_gzip.py")))],
                ["test_pkgutil.py", new File(new TextEncoder().encode(read("./lib/test/test_pkgutil.py")))],
                ["test_int_literal.py", new File(new TextEncoder().encode(read("./lib/test/test_int_literal.py")))],
                ["test_bufio.py", new File(new TextEncoder().encode(read("./lib/test/test_bufio.py")))],
                ["test_module", new Directory([
                ["bad_getattr2.py", new File(new TextEncoder().encode(read("./lib/test/test_module/bad_getattr2.py")))],
                ["good_getattr.py", new File(new TextEncoder().encode(read("./lib/test/test_module/good_getattr.py")))],
                ["final_b.py", new File(new TextEncoder().encode(read("./lib/test/test_module/final_b.py")))],
                ["bad_getattr3.py", new File(new TextEncoder().encode(read("./lib/test/test_module/bad_getattr3.py")))],
                ["final_a.py", new File(new TextEncoder().encode(read("./lib/test/test_module/final_a.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_module/__init__.py")))],
                ["bad_getattr.py", new File(new TextEncoder().encode(read("./lib/test/test_module/bad_getattr.py")))],
                ])],
                ["decimaltestdata", new Directory([
                ["ln.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ln.decTest")))],
                ["ddToIntegral.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddToIntegral.decTest")))],
                ["ddCopyNegate.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddCopyNegate.decTest")))],
                ["powersqrt.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/powersqrt.decTest")))],
                ["dqMinus.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqMinus.decTest")))],
                ["dqNextMinus.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqNextMinus.decTest")))],
                ["dqToIntegral.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqToIntegral.decTest")))],
                ["ddOr.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddOr.decTest")))],
                ["dqPlus.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqPlus.decTest")))],
                ["dqSameQuantum.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqSameQuantum.decTest")))],
                ["or.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/or.decTest")))],
                ["ddBase.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddBase.decTest")))],
                ["dqClass.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqClass.decTest")))],
                ["inexact.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/inexact.decTest")))],
                ["dqRemainder.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqRemainder.decTest")))],
                ["dqCopyAbs.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqCopyAbs.decTest")))],
                ["fma.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/fma.decTest")))],
                ["randoms.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/randoms.decTest")))],
                ["dqFMA.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqFMA.decTest")))],
                ["dsBase.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dsBase.decTest")))],
                ["base.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/base.decTest")))],
                ["dqCopy.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqCopy.decTest")))],
                ["ddNextPlus.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddNextPlus.decTest")))],
                ["exp.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/exp.decTest")))],
                ["ddCompare.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddCompare.decTest")))],
                ["dqBase.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqBase.decTest")))],
                ["ddMinus.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddMinus.decTest")))],
                ["ddRotate.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddRotate.decTest")))],
                ["dqShift.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqShift.decTest")))],
                ["power.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/power.decTest")))],
                ["max.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/max.decTest")))],
                ["dqMultiply.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqMultiply.decTest")))],
                ["ddLogB.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddLogB.decTest")))],
                ["ddQuantize.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddQuantize.decTest")))],
                ["rescale.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/rescale.decTest")))],
                ["minus.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/minus.decTest")))],
                ["dqLogB.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqLogB.decTest")))],
                ["ddAbs.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddAbs.decTest")))],
                ["tointegralx.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/tointegralx.decTest")))],
                ["dqOr.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqOr.decTest")))],
                ["shift.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/shift.decTest")))],
                ["ddMin.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddMin.decTest")))],
                ["copyabs.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/copyabs.decTest")))],
                ["ddMultiply.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddMultiply.decTest")))],
                ["ddDivideInt.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddDivideInt.decTest")))],
                ["abs.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/abs.decTest")))],
                ["ddMinMag.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddMinMag.decTest")))],
                ["quantize.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/quantize.decTest")))],
                ["ddCopySign.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddCopySign.decTest")))],
                ["and.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/and.decTest")))],
                ["rounding.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/rounding.decTest")))],
                ["ddSameQuantum.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddSameQuantum.decTest")))],
                ["dqMaxMag.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqMaxMag.decTest")))],
                ["ddCopy.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddCopy.decTest")))],
                ["tointegral.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/tointegral.decTest")))],
                ["dqAbs.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqAbs.decTest")))],
                ["dqRemainderNear.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqRemainderNear.decTest")))],
                ["invert.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/invert.decTest")))],
                ["compare.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/compare.decTest")))],
                ["ddMax.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddMax.decTest")))],
                ["dqRotate.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqRotate.decTest")))],
                ["dqMax.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqMax.decTest")))],
                ["dqAnd.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqAnd.decTest")))],
                ["nextminus.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/nextminus.decTest")))],
                ["dqCompareTotalMag.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqCompareTotalMag.decTest")))],
                ["ddRemainderNear.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddRemainderNear.decTest")))],
                ["nextplus.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/nextplus.decTest")))],
                ["dqNextPlus.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqNextPlus.decTest")))],
                ["remainder.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/remainder.decTest")))],
                ["minmag.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/minmag.decTest")))],
                ["plus.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/plus.decTest")))],
                ["dsEncode.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dsEncode.decTest")))],
                ["dqCopySign.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqCopySign.decTest")))],
                ["comparetotal.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/comparetotal.decTest")))],
                ["dqMinMag.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqMinMag.decTest")))],
                ["ddRemainder.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddRemainder.decTest")))],
                ["copy.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/copy.decTest")))],
                ["dqMin.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqMin.decTest")))],
                ["ddNextToward.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddNextToward.decTest")))],
                ["ddCompareTotalMag.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddCompareTotalMag.decTest")))],
                ["ddMaxMag.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddMaxMag.decTest")))],
                ["nexttoward.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/nexttoward.decTest")))],
                ["ddInvert.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddInvert.decTest")))],
                ["ddCompareSig.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddCompareSig.decTest")))],
                ["dqSubtract.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqSubtract.decTest")))],
                ["reduce.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/reduce.decTest")))],
                ["dqReduce.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqReduce.decTest")))],
                ["decSingle.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/decSingle.decTest")))],
                ["ddSubtract.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddSubtract.decTest")))],
                ["dqQuantize.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqQuantize.decTest")))],
                ["dqCopyNegate.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqCopyNegate.decTest")))],
                ["copynegate.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/copynegate.decTest")))],
                ["ddCanonical.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddCanonical.decTest")))],
                ["ddReduce.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddReduce.decTest")))],
                ["scaleb.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/scaleb.decTest")))],
                ["rotate.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/rotate.decTest")))],
                ["ddPlus.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddPlus.decTest")))],
                ["ddXor.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddXor.decTest")))],
                ["min.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/min.decTest")))],
                ["dqDivideInt.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqDivideInt.decTest")))],
                ["logb.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/logb.decTest")))],
                ["ddScaleB.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddScaleB.decTest")))],
                ["ddDivide.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddDivide.decTest")))],
                ["randomBound32.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/randomBound32.decTest")))],
                ["dqCompareTotal.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqCompareTotal.decTest")))],
                ["extra.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/extra.decTest")))],
                ["decDouble.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/decDouble.decTest")))],
                ["remainderNear.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/remainderNear.decTest")))],
                ["dqCanonical.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqCanonical.decTest")))],
                ["copysign.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/copysign.decTest")))],
                ["comparetotmag.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/comparetotmag.decTest")))],
                ["xor.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/xor.decTest")))],
                ["dqScaleB.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqScaleB.decTest")))],
                ["dqEncode.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqEncode.decTest")))],
                ["ddFMA.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddFMA.decTest")))],
                ["ddAdd.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddAdd.decTest")))],
                ["dqDivide.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqDivide.decTest")))],
                ["subtract.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/subtract.decTest")))],
                ["decQuad.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/decQuad.decTest")))],
                ["dqCompareSig.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqCompareSig.decTest")))],
                ["ddClass.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddClass.decTest")))],
                ["ddCompareTotal.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddCompareTotal.decTest")))],
                ["dqXor.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqXor.decTest")))],
                ["log10.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/log10.decTest")))],
                ["ddNextMinus.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddNextMinus.decTest")))],
                ["ddAnd.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddAnd.decTest")))],
                ["testall.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/testall.decTest")))],
                ["divideint.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/divideint.decTest")))],
                ["ddEncode.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddEncode.decTest")))],
                ["class.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/class.decTest")))],
                ["divide.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/divide.decTest")))],
                ["add.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/add.decTest")))],
                ["ddShift.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddShift.decTest")))],
                ["squareroot.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/squareroot.decTest")))],
                ["ddCopyAbs.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/ddCopyAbs.decTest")))],
                ["dqNextToward.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqNextToward.decTest")))],
                ["dqCompare.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqCompare.decTest")))],
                ["clamp.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/clamp.decTest")))],
                ["maxmag.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/maxmag.decTest")))],
                ["samequantum.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/samequantum.decTest")))],
                ["multiply.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/multiply.decTest")))],
                ["dqAdd.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqAdd.decTest")))],
                ["dqInvert.decTest", new File(new TextEncoder().encode(read("./lib/test/decimaltestdata/dqInvert.decTest")))],
                ])],
                ["test_venv.py", new File(new TextEncoder().encode(read("./lib/test/test_venv.py")))],
                ["autotest.py", new File(new TextEncoder().encode(read("./lib/test/autotest.py")))],
                ["test_dtrace.py", new File(new TextEncoder().encode(read("./lib/test/test_dtrace.py")))],
                ["test_unicode_file.py", new File(new TextEncoder().encode(read("./lib/test/test_unicode_file.py")))],
                ["test_binop.py", new File(new TextEncoder().encode(read("./lib/test/test_binop.py")))],
                ["test_ttk_textonly.py", new File(new TextEncoder().encode(read("./lib/test/test_ttk_textonly.py")))],
                ["test_copyreg.py", new File(new TextEncoder().encode(read("./lib/test/test_copyreg.py")))],
                ["randv2_64.pck", new File(new TextEncoder().encode(read("./lib/test/randv2_64.pck")))],
                ["test_ntpath.py", new File(new TextEncoder().encode(read("./lib/test/test_ntpath.py")))],
                ["test_ssl.py", new File(new TextEncoder().encode(read("./lib/test/test_ssl.py")))],
                ["test_listcomps.py", new File(new TextEncoder().encode(read("./lib/test/test_listcomps.py")))],
                ["test_rlcompleter.py", new File(new TextEncoder().encode(read("./lib/test/test_rlcompleter.py")))],
                ["test_html.py", new File(new TextEncoder().encode(read("./lib/test/test_html.py")))],
                ["test_type_comments.py", new File(new TextEncoder().encode(read("./lib/test/test_type_comments.py")))],
                ["test_asyncio", new Directory([
                ["test_queues.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_queues.py")))],
                ["test_buffered_proto.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_buffered_proto.py")))],
                ["test_protocols.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_protocols.py")))],
                ["test_sslproto.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_sslproto.py")))],
                ["test_transports.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_transports.py")))],
                ["test_base_events.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_base_events.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/__main__.py")))],
                ["test_sock_lowlevel.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_sock_lowlevel.py")))],
                ["functional.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/functional.py")))],
                ["utils.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/utils.py")))],
                ["test_tasks.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_tasks.py")))],
                ["test_context.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_context.py")))],
                ["test_server.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_server.py")))],
                ["test_windows_events.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_windows_events.py")))],
                ["test_pep492.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_pep492.py")))],
                ["test_streams.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_streams.py")))],
                ["test_windows_utils.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_windows_utils.py")))],
                ["test_timeouts.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_timeouts.py")))],
                ["test_threads.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_threads.py")))],
                ["test_proactor_events.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_proactor_events.py")))],
                ["test_selector_events.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_selector_events.py")))],
                ["echo2.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/echo2.py")))],
                ["test_unix_events.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_unix_events.py")))],
                ["test_taskgroups.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_taskgroups.py")))],
                ["test_runners.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_runners.py")))],
                ["echo.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/echo.py")))],
                ["test_locks.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_locks.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/__init__.py")))],
                ["test_waitfor.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_waitfor.py")))],
                ["echo3.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/echo3.py")))],
                ["test_futures2.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_futures2.py")))],
                ["test_subprocess.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_subprocess.py")))],
                ["test_events.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_events.py")))],
                ["test_ssl.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_ssl.py")))],
                ["test_eager_task_factory.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_eager_task_factory.py")))],
                ["test_futures.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_futures.py")))],
                ["test_sendfile.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncio/test_sendfile.py")))],
                ])],
                ["test__opcode.py", new File(new TextEncoder().encode(read("./lib/test/test__opcode.py")))],
                ["test_genericclass.py", new File(new TextEncoder().encode(read("./lib/test/test_genericclass.py")))],
                ["test_sundry.py", new File(new TextEncoder().encode(read("./lib/test/test_sundry.py")))],
                ["certdata", new Directory([
                ["leaf-missing-aki.ca.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/leaf-missing-aki.ca.pem")))],
                ["nullbytecert.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/nullbytecert.pem")))],
                ["keycert.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/keycert.pem")))],
                ["nullcert.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/nullcert.pem")))],
                ["make_ssl_certs.py", new File(new TextEncoder().encode(read("./lib/test/certdata/make_ssl_certs.py")))],
                ["pycacert.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/pycacert.pem")))],
                ["keycert4.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/keycert4.pem")))],
                ["keycert3.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/keycert3.pem")))],
                ["nokia.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/nokia.pem")))],
                ["idnsans.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/idnsans.pem")))],
                ["ssl_cert.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/ssl_cert.pem")))],
                ["badcert.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/badcert.pem")))],
                ["talos-2019-0758.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/talos-2019-0758.pem")))],
                ["capath", new Directory([
                ["5ed36f99.0", new File(new TextEncoder().encode(read("./lib/test/certdata/capath/5ed36f99.0")))],
                ["b1930218.0", new File(new TextEncoder().encode(read("./lib/test/certdata/capath/b1930218.0")))],
                ["6e88d7b8.0", new File(new TextEncoder().encode(read("./lib/test/certdata/capath/6e88d7b8.0")))],
                ["99d0fa06.0", new File(new TextEncoder().encode(read("./lib/test/certdata/capath/99d0fa06.0")))],
                ["4e1295a3.0", new File(new TextEncoder().encode(read("./lib/test/certdata/capath/4e1295a3.0")))],
                ["ceff1710.0", new File(new TextEncoder().encode(read("./lib/test/certdata/capath/ceff1710.0")))],
                ])],
                ["revocation.crl", new File(new TextEncoder().encode(read("./lib/test/certdata/revocation.crl")))],
                ["keycert2.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/keycert2.pem")))],
                ["pycakey.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/pycakey.pem")))],
                ["keycert.passwd.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/keycert.passwd.pem")))],
                ["leaf-missing-aki.keycert.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/leaf-missing-aki.keycert.pem")))],
                ["secp384r1.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/secp384r1.pem")))],
                ["allsans.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/allsans.pem")))],
                ["keycertecc.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/keycertecc.pem")))],
                ["badkey.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/badkey.pem")))],
                ["ssl_key.passwd.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/ssl_key.passwd.pem")))],
                ["ffdh3072.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/ffdh3072.pem")))],
                ["selfsigned_pythontestdotnet.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/selfsigned_pythontestdotnet.pem")))],
                ["ssl_key.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/ssl_key.pem")))],
                ["nosan.pem", new File(new TextEncoder().encode(read("./lib/test/certdata/nosan.pem")))],
                ])],
                ["test_call.py", new File(new TextEncoder().encode(read("./lib/test/test_call.py")))],
                ["test_faulthandler.py", new File(new TextEncoder().encode(read("./lib/test/test_faulthandler.py")))],
                ["test_doctest", new Directory([
                ["test_doctest2.txt", new File(new TextEncoder().encode(read("./lib/test/test_doctest/test_doctest2.txt")))],
                ["sample_doctest_no_docstrings.py", new File(new TextEncoder().encode(read("./lib/test/test_doctest/sample_doctest_no_docstrings.py")))],
                ["sample_doctest_skip.py", new File(new TextEncoder().encode(read("./lib/test/test_doctest/sample_doctest_skip.py")))],
                ["test_doctest.py", new File(new TextEncoder().encode(read("./lib/test/test_doctest/test_doctest.py")))],
                ["sample_doctest.py", new File(new TextEncoder().encode(read("./lib/test/test_doctest/sample_doctest.py")))],
                ["sample_doctest_no_doctests.py", new File(new TextEncoder().encode(read("./lib/test/test_doctest/sample_doctest_no_doctests.py")))],
                ["test_doctest4.txt", new File(new TextEncoder().encode(read("./lib/test/test_doctest/test_doctest4.txt")))],
                ["test_doctest_skip.txt", new File(new TextEncoder().encode(read("./lib/test/test_doctest/test_doctest_skip.txt")))],
                ["test_doctest3.txt", new File(new TextEncoder().encode(read("./lib/test/test_doctest/test_doctest3.txt")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_doctest/__init__.py")))],
                ["test_doctest2.py", new File(new TextEncoder().encode(read("./lib/test/test_doctest/test_doctest2.py")))],
                ["decorator_mod.py", new File(new TextEncoder().encode(read("./lib/test/test_doctest/decorator_mod.py")))],
                ["test_doctest.txt", new File(new TextEncoder().encode(read("./lib/test/test_doctest/test_doctest.txt")))],
                ["doctest_lineno.py", new File(new TextEncoder().encode(read("./lib/test/test_doctest/doctest_lineno.py")))],
                ["doctest_aliases.py", new File(new TextEncoder().encode(read("./lib/test/test_doctest/doctest_aliases.py")))],
                ])],
                ["leakers", new Directory([
                ["README.txt", new File(new TextEncoder().encode(read("./lib/test/leakers/README.txt")))],
                ["test_selftype.py", new File(new TextEncoder().encode(read("./lib/test/leakers/test_selftype.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/leakers/__init__.py")))],
                ["test_ctypes.py", new File(new TextEncoder().encode(read("./lib/test/leakers/test_ctypes.py")))],
                ])],
                ["test_tuple.py", new File(new TextEncoder().encode(read("./lib/test/test_tuple.py")))],
                ["test_hash.py", new File(new TextEncoder().encode(read("./lib/test/test_hash.py")))],
                ["test_calendar.py", new File(new TextEncoder().encode(read("./lib/test/test_calendar.py")))],
                ["test_eof.py", new File(new TextEncoder().encode(read("./lib/test/test_eof.py")))],
                ["test_class.py", new File(new TextEncoder().encode(read("./lib/test/test_class.py")))],
                ["test_cmd_line_script.py", new File(new TextEncoder().encode(read("./lib/test/test_cmd_line_script.py")))],
                ["test_functools.py", new File(new TextEncoder().encode(read("./lib/test/test_functools.py")))],
                ["test_asyncgen.py", new File(new TextEncoder().encode(read("./lib/test/test_asyncgen.py")))],
                ["test_configparser.py", new File(new TextEncoder().encode(read("./lib/test/test_configparser.py")))],
                ["test_codeop.py", new File(new TextEncoder().encode(read("./lib/test/test_codeop.py")))],
                ["test_ucn.py", new File(new TextEncoder().encode(read("./lib/test/test_ucn.py")))],
                ["test_pyexpat.py", new File(new TextEncoder().encode(read("./lib/test/test_pyexpat.py")))],
                ["_test_multiprocessing.py", new File(new TextEncoder().encode(read("./lib/test/_test_multiprocessing.py")))],
                ["test_bool.py", new File(new TextEncoder().encode(read("./lib/test/test_bool.py")))],
                ["test_datetime.py", new File(new TextEncoder().encode(read("./lib/test/test_datetime.py")))],
                ["support", new Directory([
                ["hypothesis_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/hypothesis_helper.py")))],
                ["_hypothesis_stubs", new Directory([
                ["_helpers.py", new File(new TextEncoder().encode(read("./lib/test/support/_hypothesis_stubs/_helpers.py")))],
                ["strategies.py", new File(new TextEncoder().encode(read("./lib/test/support/_hypothesis_stubs/strategies.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/support/_hypothesis_stubs/__init__.py")))],
                ])],
                ["threading_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/threading_helper.py")))],
                ["asynchat.py", new File(new TextEncoder().encode(read("./lib/test/support/asynchat.py")))],
                ["bytecode_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/bytecode_helper.py")))],
                ["os_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/os_helper.py")))],
                ["hashlib_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/hashlib_helper.py")))],
                ["asyncore.py", new File(new TextEncoder().encode(read("./lib/test/support/asyncore.py")))],
                ["interpreters", new Directory([
                ["queues.py", new File(new TextEncoder().encode(read("./lib/test/support/interpreters/queues.py")))],
                ["channels.py", new File(new TextEncoder().encode(read("./lib/test/support/interpreters/channels.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/support/interpreters/__init__.py")))],
                ])],
                ["warnings_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/warnings_helper.py")))],
                ["socket_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/socket_helper.py")))],
                ["ast_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/ast_helper.py")))],
                ["script_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/script_helper.py")))],
                ["logging_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/logging_helper.py")))],
                ["pty_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/pty_helper.py")))],
                ["refleak_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/refleak_helper.py")))],
                ["testcase.py", new File(new TextEncoder().encode(read("./lib/test/support/testcase.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/support/__init__.py")))],
                ["smtpd.py", new File(new TextEncoder().encode(read("./lib/test/support/smtpd.py")))],
                ["import_helper.py", new File(new TextEncoder().encode(read("./lib/test/support/import_helper.py")))],
                ])],
                ["test_itertools.py", new File(new TextEncoder().encode(read("./lib/test/test_itertools.py")))],
                ["test_subclassinit.py", new File(new TextEncoder().encode(read("./lib/test/test_subclassinit.py")))],
                ["mime.types", new File(new TextEncoder().encode(read("./lib/test/mime.types")))],
                ["test_cprofile.py", new File(new TextEncoder().encode(read("./lib/test/test_cprofile.py")))],
                ["test_sys.py", new File(new TextEncoder().encode(read("./lib/test/test_sys.py")))],
                ["archiver_tests.py", new File(new TextEncoder().encode(read("./lib/test/archiver_tests.py")))],
                ["crashers", new Directory([
                ["underlying_dict.py", new File(new TextEncoder().encode(read("./lib/test/crashers/underlying_dict.py")))],
                ["bogus_code_obj.py", new File(new TextEncoder().encode(read("./lib/test/crashers/bogus_code_obj.py")))],
                ["README", new File(new TextEncoder().encode(read("./lib/test/crashers/README")))],
                ["infinite_loop_re.py", new File(new TextEncoder().encode(read("./lib/test/crashers/infinite_loop_re.py")))],
                ["mutation_inside_cyclegc.py", new File(new TextEncoder().encode(read("./lib/test/crashers/mutation_inside_cyclegc.py")))],
                ["recursive_call.py", new File(new TextEncoder().encode(read("./lib/test/crashers/recursive_call.py")))],
                ["gc_inspection.py", new File(new TextEncoder().encode(read("./lib/test/crashers/gc_inspection.py")))],
                ["trace_at_recursion_limit.py", new File(new TextEncoder().encode(read("./lib/test/crashers/trace_at_recursion_limit.py")))],
                ])],
                ["test_with.py", new File(new TextEncoder().encode(read("./lib/test/test_with.py")))],
                ["test_zlib.py", new File(new TextEncoder().encode(read("./lib/test/test_zlib.py")))],
                ["test_multibytecodec.py", new File(new TextEncoder().encode(read("./lib/test/test_multibytecodec.py")))],
                ["test_xxtestfuzz.py", new File(new TextEncoder().encode(read("./lib/test/test_xxtestfuzz.py")))],
                ["test_struct.py", new File(new TextEncoder().encode(read("./lib/test/test_struct.py")))],
                ["test_augassign.py", new File(new TextEncoder().encode(read("./lib/test/test_augassign.py")))],
                ["test_sqlite3", new Directory([
                ["test_cli.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/test_cli.py")))],
                ["test_factory.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/test_factory.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/__main__.py")))],
                ["test_transactions.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/test_transactions.py")))],
                ["test_backup.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/test_backup.py")))],
                ["test_types.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/test_types.py")))],
                ["test_dump.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/test_dump.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/__init__.py")))],
                ["util.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/util.py")))],
                ["test_dbapi.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/test_dbapi.py")))],
                ["test_hooks.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/test_hooks.py")))],
                ["test_regression.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/test_regression.py")))],
                ["test_userfunctions.py", new File(new TextEncoder().encode(read("./lib/test/test_sqlite3/test_userfunctions.py")))],
                ])],
                ["test_genexps.py", new File(new TextEncoder().encode(read("./lib/test/test_genexps.py")))],
                ["test_csv.py", new File(new TextEncoder().encode(read("./lib/test/test_csv.py")))],
                ["test_free_threading", new Directory([
                ["test_monitoring.py", new File(new TextEncoder().encode(read("./lib/test/test_free_threading/test_monitoring.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_free_threading/__init__.py")))],
                ])],
                ["test_enumerate.py", new File(new TextEncoder().encode(read("./lib/test/test_enumerate.py")))],
                ["test_bz2.py", new File(new TextEncoder().encode(read("./lib/test/test_bz2.py")))],
                ["test_dictcomps.py", new File(new TextEncoder().encode(read("./lib/test/test_dictcomps.py")))],
                ["test_startfile.py", new File(new TextEncoder().encode(read("./lib/test/test_startfile.py")))],
                ["test_codecencodings_jp.py", new File(new TextEncoder().encode(read("./lib/test/test_codecencodings_jp.py")))],
                ["test_resource.py", new File(new TextEncoder().encode(read("./lib/test/test_resource.py")))],
                ["test_pow.py", new File(new TextEncoder().encode(read("./lib/test/test_pow.py")))],
                ["test_super.py", new File(new TextEncoder().encode(read("./lib/test/test_super.py")))],
                ["test_pkg.py", new File(new TextEncoder().encode(read("./lib/test/test_pkg.py")))],
                ["_test_embed_structseq.py", new File(new TextEncoder().encode(read("./lib/test/_test_embed_structseq.py")))],
                ["test_file_eintr.py", new File(new TextEncoder().encode(read("./lib/test/test_file_eintr.py")))],
                ["test_select.py", new File(new TextEncoder().encode(read("./lib/test/test_select.py")))],
                ["test_import", new Directory([
                ["data", new Directory([
                ["unwritable", new Directory([
                ["x.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/unwritable/x.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/unwritable/__init__.py")))],
                ])],
                ["double_const.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/double_const.py")))],
                ["circular_imports", new Directory([
                ["from_cycle2.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/from_cycle2.py")))],
                ["rebinding2.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/rebinding2.py")))],
                ["basic.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/basic.py")))],
                ["use.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/use.py")))],
                ["rebinding.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/rebinding.py")))],
                ["indirect.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/indirect.py")))],
                ["subpkg2", new Directory([
                ["parent", new Directory([
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/subpkg2/parent/__init__.py")))],
                ["child.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/subpkg2/parent/child.py")))],
                ])],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/subpkg2/__init__.py")))],
                ])],
                ["subpkg", new Directory([
                ["subpackage2.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/subpkg/subpackage2.py")))],
                ["util.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/subpkg/util.py")))],
                ])],
                ["subpackage.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/subpackage.py")))],
                ["binding.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/binding.py")))],
                ["import_cycle.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/import_cycle.py")))],
                ["util.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/util.py")))],
                ["source.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/source.py")))],
                ["basic2.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/basic2.py")))],
                ["binding2.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/binding2.py")))],
                ["from_cycle1.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/circular_imports/from_cycle1.py")))],
                ])],
                ["package2", new Directory([
                ["submodule2.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/package2/submodule2.py")))],
                ["submodule1.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/package2/submodule1.py")))],
                ])],
                ["package", new Directory([
                ["submodule.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/package/submodule.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_import/data/package/__init__.py")))],
                ])],
                ])],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/test/test_import/__main__.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/test/test_import/__init__.py")))],
                ])],
                ["test_lzma.py", new File(new TextEncoder().encode(read("./lib/test/test_lzma.py")))],
                ["test_utf8source.py", new File(new TextEncoder().encode(read("./lib/test/test_utf8source.py")))],
                ["test_source_encoding.py", new File(new TextEncoder().encode(read("./lib/test/test_source_encoding.py")))],
                ["test_file.py", new File(new TextEncoder().encode(read("./lib/test/test_file.py")))],
                ["test_metaclass.py", new File(new TextEncoder().encode(read("./lib/test/test_metaclass.py")))],
                ])],
                ["statistics.py", new File(new TextEncoder().encode(read("./lib/statistics.py")))],
                ["fnmatch.py", new File(new TextEncoder().encode(read("./lib/fnmatch.py")))],
                ["pkgutil.py", new File(new TextEncoder().encode(read("./lib/pkgutil.py")))],
                ["subprocess.py", new File(new TextEncoder().encode(read("./lib/subprocess.py")))],
                ["dataclasses.py", new File(new TextEncoder().encode(read("./lib/dataclasses.py")))],
                ["base64.py", new File(new TextEncoder().encode(read("./lib/base64.py")))],
                ["plistlib.py", new File(new TextEncoder().encode(read("./lib/plistlib.py")))],
                ["urllib", new Directory([
                ["robotparser.py", new File(new TextEncoder().encode(read("./lib/urllib/robotparser.py")))],
                ["response.py", new File(new TextEncoder().encode(read("./lib/urllib/response.py")))],
                ["error.py", new File(new TextEncoder().encode(read("./lib/urllib/error.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/urllib/__init__.py")))],
                ["parse.py", new File(new TextEncoder().encode(read("./lib/urllib/parse.py")))],
                ["request.py", new File(new TextEncoder().encode(read("./lib/urllib/request.py")))],
                ])],
                ["getpass.py", new File(new TextEncoder().encode(read("./lib/getpass.py")))],
                ["tarfile.py", new File(new TextEncoder().encode(read("./lib/tarfile.py")))],
                ["_pydatetime.py", new File(new TextEncoder().encode(read("./lib/_pydatetime.py")))],
                ["this.py", new File(new TextEncoder().encode(read("./lib/this.py")))],
                ["numbers.py", new File(new TextEncoder().encode(read("./lib/numbers.py")))],
                ["fileinput.py", new File(new TextEncoder().encode(read("./lib/fileinput.py")))],
                ["unittest", new Directory([
                ["main.py", new File(new TextEncoder().encode(read("./lib/unittest/main.py")))],
                ["runner.py", new File(new TextEncoder().encode(read("./lib/unittest/runner.py")))],
                ["_log.py", new File(new TextEncoder().encode(read("./lib/unittest/_log.py")))],
                ["__main__.py", new File(new TextEncoder().encode(read("./lib/unittest/__main__.py")))],
                ["async_case.py", new File(new TextEncoder().encode(read("./lib/unittest/async_case.py")))],
                ["case.py", new File(new TextEncoder().encode(read("./lib/unittest/case.py")))],
                ["signals.py", new File(new TextEncoder().encode(read("./lib/unittest/signals.py")))],
                ["mock.py", new File(new TextEncoder().encode(read("./lib/unittest/mock.py")))],
                ["result.py", new File(new TextEncoder().encode(read("./lib/unittest/result.py")))],
                ["suite.py", new File(new TextEncoder().encode(read("./lib/unittest/suite.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/unittest/__init__.py")))],
                ["util.py", new File(new TextEncoder().encode(read("./lib/unittest/util.py")))],
                ["loader.py", new File(new TextEncoder().encode(read("./lib/unittest/loader.py")))],
                ])],
                ["code.py", new File(new TextEncoder().encode(read("./lib/code.py")))],
                ["tokenize.py", new File(new TextEncoder().encode(read("./lib/tokenize.py")))],
                ["bisect.py", new File(new TextEncoder().encode(read("./lib/bisect.py")))],
                ["dbm", new Directory([
                ["ndbm.py", new File(new TextEncoder().encode(read("./lib/dbm/ndbm.py")))],
                ["gnu.py", new File(new TextEncoder().encode(read("./lib/dbm/gnu.py")))],
                ["sqlite3.py", new File(new TextEncoder().encode(read("./lib/dbm/sqlite3.py")))],
                ["dumb.py", new File(new TextEncoder().encode(read("./lib/dbm/dumb.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/dbm/__init__.py")))],
                ])],
                ["wsgiref", new Directory([
                ["validate.py", new File(new TextEncoder().encode(read("./lib/wsgiref/validate.py")))],
                ["handlers.py", new File(new TextEncoder().encode(read("./lib/wsgiref/handlers.py")))],
                ["simple_server.py", new File(new TextEncoder().encode(read("./lib/wsgiref/simple_server.py")))],
                ["headers.py", new File(new TextEncoder().encode(read("./lib/wsgiref/headers.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/wsgiref/__init__.py")))],
                ["util.py", new File(new TextEncoder().encode(read("./lib/wsgiref/util.py")))],
                ["types.py", new File(new TextEncoder().encode(read("./lib/wsgiref/types.py")))],
                ])],
                ["importlib", new Directory([
                ["abc.py", new File(new TextEncoder().encode(read("./lib/importlib/abc.py")))],
                ["readers.py", new File(new TextEncoder().encode(read("./lib/importlib/readers.py")))],
                ["_bootstrap_external.py", new File(new TextEncoder().encode(read("./lib/importlib/_bootstrap_external.py")))],
                ["_bootstrap.py", new File(new TextEncoder().encode(read("./lib/importlib/_bootstrap.py")))],
                ["resources", new Directory([
                ["abc.py", new File(new TextEncoder().encode(read("./lib/importlib/resources/abc.py")))],
                ["readers.py", new File(new TextEncoder().encode(read("./lib/importlib/resources/readers.py")))],
                ["_common.py", new File(new TextEncoder().encode(read("./lib/importlib/resources/_common.py")))],
                ["_adapters.py", new File(new TextEncoder().encode(read("./lib/importlib/resources/_adapters.py")))],
                ["simple.py", new File(new TextEncoder().encode(read("./lib/importlib/resources/simple.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/importlib/resources/__init__.py")))],
                ["_itertools.py", new File(new TextEncoder().encode(read("./lib/importlib/resources/_itertools.py")))],
                ["_functional.py", new File(new TextEncoder().encode(read("./lib/importlib/resources/_functional.py")))],
                ])],
                ["__pycache__", new Directory([
                ["util.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/importlib/__pycache__/util.cpython-313.pyc")))],
                ["machinery.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/importlib/__pycache__/machinery.cpython-313.pyc")))],
                ["_abc.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/importlib/__pycache__/_abc.cpython-313.pyc")))],
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/importlib/__pycache__/__init__.cpython-313.pyc")))],
                ])],
                ["metadata", new Directory([
                ["_adapters.py", new File(new TextEncoder().encode(read("./lib/importlib/metadata/_adapters.py")))],
                ["_text.py", new File(new TextEncoder().encode(read("./lib/importlib/metadata/_text.py")))],
                ["_functools.py", new File(new TextEncoder().encode(read("./lib/importlib/metadata/_functools.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/importlib/metadata/__init__.py")))],
                ["_collections.py", new File(new TextEncoder().encode(read("./lib/importlib/metadata/_collections.py")))],
                ["_meta.py", new File(new TextEncoder().encode(read("./lib/importlib/metadata/_meta.py")))],
                ["diagnose.py", new File(new TextEncoder().encode(read("./lib/importlib/metadata/diagnose.py")))],
                ["_itertools.py", new File(new TextEncoder().encode(read("./lib/importlib/metadata/_itertools.py")))],
                ])],
                ["machinery.py", new File(new TextEncoder().encode(read("./lib/importlib/machinery.py")))],
                ["simple.py", new File(new TextEncoder().encode(read("./lib/importlib/simple.py")))],
                ["_abc.py", new File(new TextEncoder().encode(read("./lib/importlib/_abc.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/importlib/__init__.py")))],
                ["util.py", new File(new TextEncoder().encode(read("./lib/importlib/util.py")))],
                ])],
                ["ipaddress.py", new File(new TextEncoder().encode(read("./lib/ipaddress.py")))],
                ["inspect.py", new File(new TextEncoder().encode(read("./lib/inspect.py")))],
                ["string.py", new File(new TextEncoder().encode(read("./lib/string.py")))],
                ["tomllib", new Directory([
                ["_types.py", new File(new TextEncoder().encode(read("./lib/tomllib/_types.py")))],
                ["_parser.py", new File(new TextEncoder().encode(read("./lib/tomllib/_parser.py")))],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/tomllib/__init__.py")))],
                ["_re.py", new File(new TextEncoder().encode(read("./lib/tomllib/_re.py")))],
                ])],
                ["site-packages", new Directory([
                ["README.txt", new File(new TextEncoder().encode(read("./lib/site-packages/README.txt")))],
                ])],
                ["doctest.py", new File(new TextEncoder().encode(read("./lib/doctest.py")))],
                ["_aix_support.py", new File(new TextEncoder().encode(read("./lib/_aix_support.py")))],
                ["zoneinfo", new Directory([
                ["_tzpath.py", new File(new TextEncoder().encode(read("./lib/zoneinfo/_tzpath.py")))],
                ["_common.py", new File(new TextEncoder().encode(read("./lib/zoneinfo/_common.py")))],
                ["_zoneinfo.py", new File(new TextEncoder().encode(read("./lib/zoneinfo/_zoneinfo.py")))],
                ["__pycache__", new Directory([
                ["_tzpath.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/zoneinfo/__pycache__/_tzpath.cpython-313.pyc")))],
                ["__init__.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/zoneinfo/__pycache__/__init__.cpython-313.pyc")))],
                ["_common.cpython-313.pyc", new File(new TextEncoder().encode(read("./lib/zoneinfo/__pycache__/_common.cpython-313.pyc")))],
                ])],
                ["__init__.py", new File(new TextEncoder().encode(read("./lib/zoneinfo/__init__.py")))],
                ])],
                ["threading.py", new File(new TextEncoder().encode(read("./lib/threading.py")))],
                ["colorsys.py", new File(new TextEncoder().encode(read("./lib/colorsys.py")))],
                ["types.py", new File(new TextEncoder().encode(read("./lib/types.py")))],
                ["trace.py", new File(new TextEncoder().encode(read("./lib/trace.py")))],
                ["hashlib.py", new File(new TextEncoder().encode(read("./lib/hashlib.py")))],
                ["copyreg.py", new File(new TextEncoder().encode(read("./lib/copyreg.py")))],
                ["filecmp.py", new File(new TextEncoder().encode(read("./lib/filecmp.py")))],
                ["random.py", new File(new TextEncoder().encode(read("./lib/random.py")))],
                ["operator.py", new File(new TextEncoder().encode(read("./lib/operator.py")))],
                ])
  ];
  let wasi = new WASI(wasi_args, env, fds, {debug:false});
  let wasm = await WebAssembly.compile(read_file("./python.wasm"));
  let inst = await WebAssembly.instantiate(wasm, {
    wasi_snapshot_preview1: wasi.wasiImport,
  });
  wasi.start(inst);
}
wasi_runner(wasi_main);
