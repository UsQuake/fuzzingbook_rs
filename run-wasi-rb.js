console = console || { log: (...args) => print(Array.prototype.slice.call(args).join(' ')) }
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
      let result = '';
      let i = 0;
  
      while (i < bytes.byteLength) {
        let byte1 = bytes[i++];
        let byte2, byte3, byte4;
        let codePoint = 0;
  
        if ((byte1 & 0x80) === 0) {
          // 1 바이트 문자
          codePoint = byte1;
        } else if ((byte1 & 0xE0) === 0xC0) {
          // 2 바이트 문자
          byte2 = bytes[i++] & 0x3F;
          codePoint = ((byte1 & 0x1F) << 6) | byte2;
        } else if ((byte1 & 0xF0) === 0xE0) {
          // 3 바이트 문자
          byte2 = bytes[i++] & 0x3F;
          byte3 = bytes[i++] & 0x3F;
          codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
        } else if ((byte1 & 0xF8) === 0xF0) {
          // 4 바이트 문자
          byte2 = bytes[i++] & 0x3F;
          byte3 = bytes[i++] & 0x3F;
          byte4 = bytes[i++] & 0x3F;
          codePoint = ((byte1 & 0x07) << 18) | (byte2 << 12) | (byte3 << 6) | byte4;
        }
  
        result += String.fromCodePoint(codePoint);
      }
  
      return result;
    }
}

const FD_STDIN=0;const FD_STDOUT=1;const FD_STDERR=2;const CLOCKID_REALTIME=0;const CLOCKID_MONOTONIC=1;const CLOCKID_PROCESS_CPUTIME_ID=2;const CLOCKID_THREAD_CPUTIME_ID=3;const ERRNO_SUCCESS=0;const ERRNO_2BIG=1;const ERRNO_ACCES=2;const ERRNO_ADDRINUSE=3;const ERRNO_ADDRNOTAVAIL=4;const ERRNO_AFNOSUPPORT=5;const ERRNO_AGAIN=6;const ERRNO_ALREADY=7;const ERRNO_BADF=8;const ERRNO_BADMSG=9;const ERRNO_BUSY=10;const ERRNO_CANCELED=11;const ERRNO_CHILD=12;const ERRNO_CONNABORTED=13;const ERRNO_CONNREFUSED=14;const ERRNO_CONNRESET=15;const ERRNO_DEADLK=16;const ERRNO_DESTADDRREQ=17;const ERRNO_DOM=18;const ERRNO_DQUOT=19;const ERRNO_EXIST=20;const ERRNO_FAULT=21;const ERRNO_FBIG=22;const ERRNO_HOSTUNREACH=23;const ERRNO_IDRM=24;const ERRNO_ILSEQ=25;const ERRNO_INPROGRESS=26;const ERRNO_INTR=27;const ERRNO_INVAL=28;const ERRNO_IO=29;const ERRNO_ISCONN=30;const ERRNO_ISDIR=31;const ERRNO_LOOP=32;const ERRNO_MFILE=33;const ERRNO_MLINK=34;const ERRNO_MSGSIZE=35; const ERRNO_MULTIHOP=36;; const ERRNO_NAMETOOLONG=37; const ERRNO_NETDOWN=38; const ERRNO_NETRESET=39; const ERRNO_NETUNREACH=40; const ERRNO_NFILE=41; const ERRNO_NOBUFS=42; const ERRNO_NODEV=43; const ERRNO_NOENT=44; const ERRNO_NOEXEC=45; const ERRNO_NOLCK=46; const ERRNO_NOLINK=47; const ERRNO_NOMEM=48; const ERRNO_NOMSG=49; const ERRNO_NOPROTOOPT=50; const ERRNO_NOSPC=51; const ERRNO_NOSYS=52; const ERRNO_NOTCONN=53; const ERRNO_NOTDIR=54; const ERRNO_NOTEMPTY=55; const ERRNO_NOTRECOVERABLE=56; const ERRNO_NOTSOCK=57; const ERRNO_NOTSUP=58; const ERRNO_NOTTY=59; const ERRNO_NXIO=60; const ERRNO_OVERFLOW=61; const ERRNO_OWNERDEAD=62; const ERRNO_PERM=63; const ERRNO_PIPE=64; const ERRNO_PROTO=65; const ERRNO_PROTONOSUPPORT=66; const ERRNO_PROTOTYPE=67; const ERRNO_RANGE=68; const ERRNO_ROFS=69; const ERRNO_SPIPE=70; const ERRNO_SRCH=71; const ERRNO_STALE=72; const ERRNO_TIMEDOUT=73; const ERRNO_TXTBSY=74; const ERRNO_XDEV=75; const ERRNO_NOTCAPABLE=76; const RIGHTS_FD_DATASYNC=1<<0; const RIGHTS_FD_READ=1<<1; const RIGHTS_FD_SEEK=1<<2; const RIGHTS_FD_FDSTAT_SET_FLAGS=1<<3; const RIGHTS_FD_SYNC=1<<4; const RIGHTS_FD_TELL=1<<5; const RIGHTS_FD_WRITE=1<<6; const RIGHTS_FD_ADVISE=1<<7; const RIGHTS_FD_ALLOCATE=1<<8; const RIGHTS_PATH_CREATE_DIRECTORY=1<<9; const RIGHTS_PATH_CREATE_FILE=1<<10; const RIGHTS_PATH_LINK_SOURCE=1<<11; const RIGHTS_PATH_LINK_TARGET=1<<12; const RIGHTS_PATH_OPEN=1<<13; const RIGHTS_FD_READDIR=1<<14; const RIGHTS_PATH_READLINK=1<<15; const RIGHTS_PATH_RENAME_SOURCE=1<<16; const RIGHTS_PATH_RENAME_TARGET=1<<17; const RIGHTS_PATH_FILESTAT_GET=1<<18; const RIGHTS_PATH_FILESTAT_SET_SIZE=1<<19; const RIGHTS_PATH_FILESTAT_SET_TIMES=1<<20; const RIGHTS_FD_FILESTAT_GET=1<<21; const RIGHTS_FD_FILESTAT_SET_SIZE=1<<22; const RIGHTS_FD_FILESTAT_SET_TIMES=1<<23; const RIGHTS_PATH_SYMLINK=1<<24; const RIGHTS_PATH_REMOVE_DIRECTORY=1<<25; const RIGHTS_PATH_UNLINK_FILE=1<<26; const RIGHTS_POLL_FD_READWRITE=1<<27; const RIGHTS_SOCK_SHUTDOWN=1<<28; class Iovec{static read_bytes(view,ptr){const iovec=new Iovec;iovec.buf=view.getUint32(ptr,true);iovec.buf_len=view.getUint32(ptr+4,true);return iovec}static read_bytes_array(view,ptr,len){const iovecs=[];for(let i=0;i<len;i++){iovecs.push(Iovec.read_bytes(view,ptr+8*i))}return iovecs}} class Ciovec{static read_bytes(view,ptr){const iovec=new Ciovec;iovec.buf=view.getUint32(ptr,true);iovec.buf_len=view.getUint32(ptr+4,true);return iovec}static read_bytes_array(view,ptr,len){const iovecs=[];for(let i=0;i<len;i++){iovecs.push(Ciovec.read_bytes(view,ptr+8*i))}return iovecs}} const WHENCE_SET=0; const WHENCE_CUR=1; const WHENCE_END=2; const FILETYPE_UNKNOWN=0; const FILETYPE_BLOCK_DEVICE=1; const FILETYPE_CHARACTER_DEVICE=2; const FILETYPE_DIRECTORY=3; const FILETYPE_REGULAR_FILE=4; const FILETYPE_SOCKET_DGRAM=5; const FILETYPE_SOCKET_STREAM=6; const FILETYPE_SYMBOLIC_LINK=7; class Dirent{head_length(){return 24}name_length(){return this.dir_name.byteLength}write_head_bytes(view,ptr){view.setBigUint64(ptr,this.d_next,true);view.setBigUint64(ptr+8,this.d_ino,true);view.setUint32(ptr+16,this.dir_name.length,true);view.setUint8(ptr+20,this.d_type)}write_name_bytes(view8,ptr,buf_len){view8.set(this.dir_name.slice(0,Math.min(this.dir_name.byteLength,buf_len)),ptr)}constructor(next_cookie,name,type){this.d_ino=0n;const encoded_name=new TextEncoder().encode(name);this.d_next=next_cookie;this.d_namlen=encoded_name.byteLength;this.d_type=type;this.dir_name=encoded_name}} const ADVICE_NORMAL=0; const ADVICE_SEQUENTIAL=1; const ADVICE_RANDOM=2; const ADVICE_WILLNEED=3; const ADVICE_DONTNEED=4; const ADVICE_NOREUSE=5; const FDFLAGS_APPEND=1<<0; const FDFLAGS_DSYNC=1<<1; const FDFLAGS_NONBLOCK=1<<2; const FDFLAGS_RSYNC=1<<3; const FDFLAGS_SYNC=1<<4; class Fdstat{write_bytes(view,ptr){view.setUint8(ptr,this.fs_filetype);view.setUint16(ptr+2,this.fs_flags,true);view.setBigUint64(ptr+8,this.fs_rights_base,true);view.setBigUint64(ptr+16,this.fs_rights_inherited,true)}constructor(filetype,flags){this.fs_rights_base=0n;this.fs_rights_inherited=0n;this.fs_filetype=filetype;this.fs_flags=flags}} const FSTFLAGS_ATIM=1<<0; const FSTFLAGS_ATIM_NOW=1<<1; const FSTFLAGS_MTIM=1<<2; const FSTFLAGS_MTIM_NOW=1<<3; const OFLAGS_CREAT=1<<0; const OFLAGS_DIRECTORY=1<<1; const OFLAGS_EXCL=1<<2; const OFLAGS_TRUNC=1<<3; class Filestat{write_bytes(view,ptr){view.setBigUint64(ptr,this.dev,true);view.setBigUint64(ptr+8,this.ino,true);view.setUint8(ptr+16,this.filetype);view.setBigUint64(ptr+24,this.nlink,true);view.setBigUint64(ptr+32,this.size,true);view.setBigUint64(ptr+38,this.atim,true);view.setBigUint64(ptr+46,this.mtim,true);view.setBigUint64(ptr+52,this.ctim,true)}constructor(filetype,size){this.dev=0n;this.ino=0n;this.nlink=0n;this.atim=0n;this.mtim=0n;this.ctim=0n;this.filetype=filetype;this.size=size}} const EVENTTYPE_CLOCK=0; const EVENTTYPE_FD_READ=1; const EVENTTYPE_FD_WRITE=2; const EVENTRWFLAGS_FD_READWRITE_HANGUP=1<<0; const SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME=1<<0; const SIGNAL_NONE=0; const SIGNAL_HUP=1; const SIGNAL_INT=2; const SIGNAL_QUIT=3; const SIGNAL_ILL=4; const SIGNAL_TRAP=5; const SIGNAL_ABRT=6; const SIGNAL_BUS=7; const SIGNAL_FPE=8; const SIGNAL_KILL=9; const SIGNAL_USR1=10; const SIGNAL_SEGV=11; const SIGNAL_USR2=12; const SIGNAL_PIPE=13; const SIGNAL_ALRM=14; const SIGNAL_TERM=15; const SIGNAL_CHLD=16; const SIGNAL_CONT=17; const SIGNAL_STOP=18; const SIGNAL_TSTP=19; const SIGNAL_TTIN=20; const SIGNAL_TTOU=21; const SIGNAL_URG=22; const SIGNAL_XCPU=23; const SIGNAL_XFSZ=24; const SIGNAL_VTALRM=25; const SIGNAL_PROF=26; const SIGNAL_WINCH=27; const SIGNAL_POLL=28; const SIGNAL_PWR=29; const SIGNAL_SYS=30; const RIFLAGS_RECV_PEEK=1<<0; const RIFLAGS_RECV_WAITALL=1<<1; const ROFLAGS_RECV_DATA_TRUNCATED=1<<0; const SDFLAGS_RD=1<<0; const SDFLAGS_WR=1<<1; const PREOPENTYPE_DIR=0; class PrestatDir{write_bytes(view,ptr){view.setUint32(ptr,this.pr_name.byteLength,true)}constructor(name){this.pr_name=new TextEncoder().encode(name)}} class Prestat{static dir(name){const prestat=new Prestat;prestat.tag=PREOPENTYPE_DIR;prestat.inner=new PrestatDir(name);return prestat}write_bytes(view,ptr){view.setUint32(ptr,this.tag,true);this.inner.write_bytes(view,ptr+4)}}
let Debug=class Debug{enable(enabled){this.log=createLogger(enabled===undefined?true:enabled,this.prefix)}get enabled(){return this.isEnabled}constructor(isEnabled){this.isEnabled=isEnabled;this.prefix="wasi:";this.enable(isEnabled)}};function createLogger(enabled,prefix){if(enabled){const a=console.log.bind(console,"%c%s","color: #265BA0",prefix);return a}else{return()=>{}}}
const debug=new Debug(false);
function strace(imports,no_trace){return new Proxy(imports,{get(target,prop,receiver){const f=Reflect.get(target,prop,receiver);if(no_trace.includes(prop)){return f}return function(...args){console.log(prop,"(",...args,")");const result=Reflect.apply(f,receiver,args);console.log(" =",result);return result}}})}
class Fd{fd_allocate(offset,len){return ERRNO_NOTSUP}fd_close(){return 0}fd_fdstat_get(){return{ret:ERRNO_NOTSUP,fdstat:null}}fd_fdstat_set_flags(flags){return ERRNO_NOTSUP}fd_fdstat_set_rights(fs_rights_base,fs_rights_inheriting){return ERRNO_NOTSUP}fd_filestat_get(){return{ret:ERRNO_NOTSUP,filestat:null}}fd_filestat_set_size(size){return ERRNO_NOTSUP}fd_filestat_set_times(atim,mtim,fst_flags){return ERRNO_NOTSUP}fd_pread(size,offset){return{ret:ERRNO_NOTSUP,data:new Uint8Array}}fd_prestat_get(){return{ret:ERRNO_NOTSUP,prestat:null}}fd_pwrite(data,offset){return{ret:ERRNO_NOTSUP,nwritten:0}}fd_read(size){return{ret:ERRNO_NOTSUP,data:new Uint8Array}}fd_readdir_single(cookie){return{ret:ERRNO_NOTSUP,dirent:null}}fd_seek(offset,whence){return{ret:ERRNO_NOTSUP,offset:0n}}fd_sync(){return 0}fd_tell(){return{ret:ERRNO_NOTSUP,offset:0n}}fd_write(data){return{ret:ERRNO_NOTSUP,nwritten:0}}path_create_directory(path){return ERRNO_NOTSUP}path_filestat_get(flags,path){return{ret:ERRNO_NOTSUP,filestat:null}}path_filestat_set_times(flags,path,atim,mtim,fst_flags){return ERRNO_NOTSUP}path_link(path,inode,allow_dir){return ERRNO_NOTSUP}path_unlink(path){return{ret:ERRNO_NOTSUP,inode_obj:null}}path_lookup(path,dirflags){return{ret:ERRNO_NOTSUP,inode_obj:null}}path_open(dirflags,path,oflags,fs_rights_base,fs_rights_inheriting,fd_flags){return{ret:ERRNO_NOTDIR,fd_obj:null}}path_readlink(path){return{ret:ERRNO_NOTSUP,data:null}}path_remove_directory(path){return ERRNO_NOTSUP}path_rename(old_path,new_fd,new_path){return ERRNO_NOTSUP}path_unlink_file(path){return ERRNO_NOTSUP}}class Inode{}
class WASIProcExit extends Error{constructor(code){super("exit with exit code "+code);this.code=code}}let WASI=class WASI{start(instance){this.inst=instance;try{instance.exports._start();return 0}catch(e){if(e instanceof WASIProcExit){return e.code}else{throw e}}}initialize(instance){this.inst=instance;if(instance.exports._initialize){instance.exports._initialize()}}constructor(args,env,fds,options={}){this.args=[];this.env=[];this.fds=[];debug.enable(options.debug);this.args=args;this.env=env;this.fds=fds;const self=this;this.wasiImport={args_sizes_get(argc,argv_buf_size){const buffer=new DataView(self.inst.exports.memory.buffer);buffer.setUint32(argc,self.args.length,true);let buf_size=0;for(const arg of self.args){buf_size+=arg.length+1}buffer.setUint32(argv_buf_size,buf_size,true);debug.log(buffer.getUint32(argc,true),buffer.getUint32(argv_buf_size,true));return 0},args_get(argv,argv_buf){const buffer=new DataView(self.inst.exports.memory.buffer);const buffer8=new Uint8Array(self.inst.exports.memory.buffer);const orig_argv_buf=argv_buf;for(let i=0;i<self.args.length;i++){buffer.setUint32(argv,argv_buf,true);argv+=4;const arg=new TextEncoder().encode(self.args[i]);buffer8.set(arg,argv_buf);buffer.setUint8(argv_buf+arg.length,0);argv_buf+=arg.length+1}if(debug.enabled){debug.log(new TextDecoder().decode(buffer8.slice(orig_argv_buf,argv_buf)))}return 0},environ_sizes_get(environ_count,environ_size){const buffer=new DataView(self.inst.exports.memory.buffer);buffer.setUint32(environ_count,self.env.length,true);let buf_size=0;for(const environ of self.env){buf_size+=environ.length+1}buffer.setUint32(environ_size,buf_size,true);debug.log(buffer.getUint32(environ_count,true),buffer.getUint32(environ_size,true));return 0},environ_get(environ,environ_buf){const buffer=new DataView(self.inst.exports.memory.buffer);const buffer8=new Uint8Array(self.inst.exports.memory.buffer);const orig_environ_buf=environ_buf;for(let i=0;i<self.env.length;i++){buffer.setUint32(environ,environ_buf,true);environ+=4;const e=new TextEncoder().encode(self.env[i]);buffer8.set(e,environ_buf);buffer.setUint8(environ_buf+e.length,0);environ_buf+=e.length+1}if(debug.enabled){debug.log(new TextDecoder().decode(buffer8.slice(orig_environ_buf,environ_buf)))}return 0},clock_res_get(id,res_ptr){let resolutionValue;switch(id){case CLOCKID_MONOTONIC:{resolutionValue=5000n;break}case CLOCKID_REALTIME:{resolutionValue=1000000n;break}default:return ERRNO_NOSYS}const view=new DataView(self.inst.exports.memory.buffer);view.setBigUint64(res_ptr,resolutionValue,true);return ERRNO_SUCCESS},clock_time_get(id,precision,time){const buffer=new DataView(self.inst.exports.memory.buffer);if(id===CLOCKID_REALTIME){buffer.setBigUint64(time,BigInt(new Date().getTime())*1000000n,true)}else if(id==CLOCKID_MONOTONIC){let monotonic_time;try{monotonic_time=BigInt(Math.round(performance.now()*1e6))}catch(e){monotonic_time=0n}buffer.setBigUint64(time,monotonic_time,true)}else{buffer.setBigUint64(time,0n,true)}return 0},fd_advise(fd,offset,len,advice){if(self.fds[fd]!=undefined){return ERRNO_SUCCESS}else{return ERRNO_BADF}},fd_allocate(fd,offset,len){if(self.fds[fd]!=undefined){return self.fds[fd].fd_allocate(offset,len)}else{return ERRNO_BADF}},fd_close(fd){if(self.fds[fd]!=undefined){const ret=self.fds[fd].fd_close();self.fds[fd]=undefined;return ret}else{return ERRNO_BADF}},fd_datasync(fd){if(self.fds[fd]!=undefined){return self.fds[fd].fd_sync()}else{return ERRNO_BADF}},fd_fdstat_get(fd,fdstat_ptr){if(self.fds[fd]!=undefined){const{ret,fdstat}=self.fds[fd].fd_fdstat_get();if(fdstat!=null){fdstat.write_bytes(new DataView(self.inst.exports.memory.buffer),fdstat_ptr)}return ret}else{return ERRNO_BADF}},fd_fdstat_set_flags(fd,flags){if(self.fds[fd]!=undefined){return self.fds[fd].fd_fdstat_set_flags(flags)}else{return ERRNO_BADF}},fd_fdstat_set_rights(fd,fs_rights_base,fs_rights_inheriting){if(self.fds[fd]!=undefined){return self.fds[fd].fd_fdstat_set_rights(fs_rights_base,fs_rights_inheriting)}else{return ERRNO_BADF}},fd_filestat_get(fd,filestat_ptr){if(self.fds[fd]!=undefined){const{ret,filestat}=self.fds[fd].fd_filestat_get();if(filestat!=null){filestat.write_bytes(new DataView(self.inst.exports.memory.buffer),filestat_ptr)}return ret}else{return ERRNO_BADF}},fd_filestat_set_size(fd,size){if(self.fds[fd]!=undefined){return self.fds[fd].fd_filestat_set_size(size)}else{return ERRNO_BADF}},fd_filestat_set_times(fd,atim,mtim,fst_flags){if(self.fds[fd]!=undefined){return self.fds[fd].fd_filestat_set_times(atim,mtim,fst_flags)}else{return ERRNO_BADF}},fd_pread(fd,iovs_ptr,iovs_len,offset,nread_ptr){const buffer=new DataView(self.inst.exports.memory.buffer);const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const iovecs=Iovec.read_bytes_array(buffer,iovs_ptr,iovs_len);let nread=0;for(const iovec of iovecs){const{ret,data}=self.fds[fd].fd_pread(iovec.buf_len,offset);if(ret!=ERRNO_SUCCESS){buffer.setUint32(nread_ptr,nread,true);return ret}buffer8.set(data,iovec.buf);nread+=data.length;offset+=BigInt(data.length);if(data.length!=iovec.buf_len){break}}buffer.setUint32(nread_ptr,nread,true);return ERRNO_SUCCESS}else{return ERRNO_BADF}},fd_prestat_get(fd,buf_ptr){const buffer=new DataView(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const{ret,prestat}=self.fds[fd].fd_prestat_get();if(prestat!=null){prestat.write_bytes(buffer,buf_ptr)}return ret}else{return ERRNO_BADF}},fd_prestat_dir_name(fd,path_ptr,path_len){if(self.fds[fd]!=undefined){const{ret,prestat}=self.fds[fd].fd_prestat_get();if(prestat==null){return ret}const prestat_dir_name=prestat.inner.pr_name;const buffer8=new Uint8Array(self.inst.exports.memory.buffer);buffer8.set(prestat_dir_name.slice(0,path_len),path_ptr);return prestat_dir_name.byteLength>path_len?ERRNO_NAMETOOLONG:ERRNO_SUCCESS}else{return ERRNO_BADF}},fd_pwrite(fd,iovs_ptr,iovs_len,offset,nwritten_ptr){const buffer=new DataView(self.inst.exports.memory.buffer);const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const iovecs=Ciovec.read_bytes_array(buffer,iovs_ptr,iovs_len);let nwritten=0;for(const iovec of iovecs){const data=buffer8.slice(iovec.buf,iovec.buf+iovec.buf_len);const{ret,nwritten:nwritten_part}=self.fds[fd].fd_pwrite(data,offset);if(ret!=ERRNO_SUCCESS){buffer.setUint32(nwritten_ptr,nwritten,true);return ret}nwritten+=nwritten_part;offset+=BigInt(nwritten_part);if(nwritten_part!=data.byteLength){break}}buffer.setUint32(nwritten_ptr,nwritten,true);return ERRNO_SUCCESS}else{return ERRNO_BADF}},fd_read(fd,iovs_ptr,iovs_len,nread_ptr){const buffer=new DataView(self.inst.exports.memory.buffer);const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const iovecs=Iovec.read_bytes_array(buffer,iovs_ptr,iovs_len);let nread=0;for(const iovec of iovecs){const{ret,data}=self.fds[fd].fd_read(iovec.buf_len);if(ret!=ERRNO_SUCCESS){buffer.setUint32(nread_ptr,nread,true);return ret}buffer8.set(data,iovec.buf);nread+=data.length;if(data.length!=iovec.buf_len){break}}buffer.setUint32(nread_ptr,nread,true);return ERRNO_SUCCESS}else{return ERRNO_BADF}},fd_readdir(fd,buf,buf_len,cookie,bufused_ptr){const buffer=new DataView(self.inst.exports.memory.buffer);const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){let bufused=0;while(true){const{ret,dirent}=self.fds[fd].fd_readdir_single(cookie);if(ret!=0){buffer.setUint32(bufused_ptr,bufused,true);return ret}if(dirent==null){break}if(buf_len-bufused<dirent.head_length()){bufused=buf_len;break}const head_bytes=new ArrayBuffer(dirent.head_length());dirent.write_head_bytes(new DataView(head_bytes),0);buffer8.set(new Uint8Array(head_bytes).slice(0,Math.min(head_bytes.byteLength,buf_len-bufused)),buf);buf+=dirent.head_length();bufused+=dirent.head_length();if(buf_len-bufused<dirent.name_length()){bufused=buf_len;break}dirent.write_name_bytes(buffer8,buf,buf_len-bufused);buf+=dirent.name_length();bufused+=dirent.name_length();cookie=dirent.d_next}buffer.setUint32(bufused_ptr,bufused,true);return 0}else{return ERRNO_BADF}},fd_renumber(fd,to){if(self.fds[fd]!=undefined&&self.fds[to]!=undefined){const ret=self.fds[to].fd_close();if(ret!=0){return ret}self.fds[to]=self.fds[fd];self.fds[fd]=undefined;return 0}else{return ERRNO_BADF}},fd_seek(fd,offset,whence,offset_out_ptr){const buffer=new DataView(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const{ret,offset:offset_out}=self.fds[fd].fd_seek(offset,whence);buffer.setBigInt64(offset_out_ptr,offset_out,true);return ret}else{return ERRNO_BADF}},fd_sync(fd){if(self.fds[fd]!=undefined){return self.fds[fd].fd_sync()}else{return ERRNO_BADF}},fd_tell(fd,offset_ptr){const buffer=new DataView(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const{ret,offset}=self.fds[fd].fd_tell();buffer.setBigUint64(offset_ptr,offset,true);return ret}else{return ERRNO_BADF}},fd_write(fd,iovs_ptr,iovs_len,nwritten_ptr){const buffer=new DataView(self.inst.exports.memory.buffer);const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const iovecs=Ciovec.read_bytes_array(buffer,iovs_ptr,iovs_len);let nwritten=0;for(const iovec of iovecs){const data=buffer8.slice(iovec.buf,iovec.buf+iovec.buf_len);const{ret,nwritten:nwritten_part}=self.fds[fd].fd_write(data);if(ret!=ERRNO_SUCCESS){buffer.setUint32(nwritten_ptr,nwritten,true);return ret}nwritten+=nwritten_part;if(nwritten_part!=data.byteLength){break}}buffer.setUint32(nwritten_ptr,nwritten,true);return ERRNO_SUCCESS}else{return ERRNO_BADF}},path_create_directory(fd,path_ptr,path_len){const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const path=new TextDecoder().decode(buffer8.slice(path_ptr,path_ptr+path_len));return self.fds[fd].path_create_directory(path)}else{return ERRNO_BADF}},path_filestat_get(fd,flags,path_ptr,path_len,filestat_ptr){const buffer=new DataView(self.inst.exports.memory.buffer);const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const path=new TextDecoder().decode(buffer8.slice(path_ptr,path_ptr+path_len));const{ret,filestat}=self.fds[fd].path_filestat_get(flags,path);if(filestat!=null){filestat.write_bytes(buffer,filestat_ptr)}return ret}else{return ERRNO_BADF}},path_filestat_set_times(fd,flags,path_ptr,path_len,atim,mtim,fst_flags){const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const path=new TextDecoder().decode(buffer8.slice(path_ptr,path_ptr+path_len));return self.fds[fd].path_filestat_set_times(flags,path,atim,mtim,fst_flags)}else{return ERRNO_BADF}},path_link(old_fd,old_flags,old_path_ptr,old_path_len,new_fd,new_path_ptr,new_path_len){const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[old_fd]!=undefined&&self.fds[new_fd]!=undefined){const old_path=new TextDecoder().decode(buffer8.slice(old_path_ptr,old_path_ptr+old_path_len));const new_path=new TextDecoder().decode(buffer8.slice(new_path_ptr,new_path_ptr+new_path_len));const{ret,inode_obj}=self.fds[old_fd].path_lookup(old_path,old_flags);if(inode_obj==null){return ret}return self.fds[new_fd].path_link(new_path,inode_obj,false)}else{return ERRNO_BADF}},path_open(fd,dirflags,path_ptr,path_len,oflags,fs_rights_base,fs_rights_inheriting,fd_flags,opened_fd_ptr){const buffer=new DataView(self.inst.exports.memory.buffer);const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const path=new TextDecoder().decode(buffer8.slice(path_ptr,path_ptr+path_len));debug.log(path);const{ret,fd_obj}=self.fds[fd].path_open(dirflags,path,oflags,fs_rights_base,fs_rights_inheriting,fd_flags);if(ret!=0){return ret}self.fds.push(fd_obj);const opened_fd=self.fds.length-1;buffer.setUint32(opened_fd_ptr,opened_fd,true);return 0}else{return ERRNO_BADF}},path_readlink(fd,path_ptr,path_len,buf_ptr,buf_len,nread_ptr){const buffer=new DataView(self.inst.exports.memory.buffer);const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const path=new TextDecoder().decode(buffer8.slice(path_ptr,path_ptr+path_len));debug.log(path);const{ret,data}=self.fds[fd].path_readlink(path);if(data!=null){const data_buf=new TextEncoder().encode(data);if(data_buf.length>buf_len){buffer.setUint32(nread_ptr,0,true);return ERRNO_BADF}buffer8.set(data_buf,buf_ptr);buffer.setUint32(nread_ptr,data_buf.length,true)}return ret}else{return ERRNO_BADF}},path_remove_directory(fd,path_ptr,path_len){const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const path=new TextDecoder().decode(buffer8.slice(path_ptr,path_ptr+path_len));return self.fds[fd].path_remove_directory(path)}else{return ERRNO_BADF}},path_rename(fd,old_path_ptr,old_path_len,new_fd,new_path_ptr,new_path_len){const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined&&self.fds[new_fd]!=undefined){const old_path=new TextDecoder().decode(buffer8.slice(old_path_ptr,old_path_ptr+old_path_len));const new_path=new TextDecoder().decode(buffer8.slice(new_path_ptr,new_path_ptr+new_path_len));let{ret,inode_obj}=self.fds[fd].path_unlink(old_path);if(inode_obj==null){return ret}ret=self.fds[new_fd].path_link(new_path,inode_obj,true);if(ret!=ERRNO_SUCCESS){if(self.fds[fd].path_link(old_path,inode_obj,true)!=ERRNO_SUCCESS){throw"path_link should always return success when relinking an inode back to the original place"}}return ret}else{return ERRNO_BADF}},path_symlink(old_path_ptr,old_path_len,fd,new_path_ptr,new_path_len){const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const old_path=new TextDecoder().decode(buffer8.slice(old_path_ptr,old_path_ptr+old_path_len));const new_path=new TextDecoder().decode(buffer8.slice(new_path_ptr,new_path_ptr+new_path_len));return ERRNO_NOTSUP}else{return ERRNO_BADF}},path_unlink_file(fd,path_ptr,path_len){const buffer8=new Uint8Array(self.inst.exports.memory.buffer);if(self.fds[fd]!=undefined){const path=new TextDecoder().decode(buffer8.slice(path_ptr,path_ptr+path_len));return self.fds[fd].path_unlink_file(path)}else{return ERRNO_BADF}},poll_oneoff(in_,out,nsubscriptions){throw"async io not supported"},proc_exit(exit_code){throw new WASIProcExit(exit_code)},proc_raise(sig){throw"raised signal "+sig},sched_yield(){},random_get(buf,buf_len){const buffer8=new Uint8Array(self.inst.exports.memory.buffer);for(let i=0;i<buf_len;i++){buffer8[buf+i]=Math.random()*256|0}},sock_recv(fd,ri_data,ri_flags){throw"sockets not supported"},sock_send(fd,si_data,si_flags){throw"sockets not supported"},sock_shutdown(fd,how){throw"sockets not supported"},sock_accept(fd,flags){throw"sockets not supported"}}}};
class SyncOPFSFile extends Inode{path_open(oflags,fs_rights_base,fd_flags){if(this.readonly&&(fs_rights_base&BigInt(RIGHTS_FD_WRITE))==BigInt(RIGHTS_FD_WRITE)){return{ret:ERRNO_PERM,fd_obj:null}}if((oflags&OFLAGS_TRUNC)==OFLAGS_TRUNC){if(this.readonly)return{ret:ERRNO_PERM,fd_obj:null};this.handle.truncate(0)}const file=new OpenSyncOPFSFile(this);if(fd_flags&FDFLAGS_APPEND)file.fd_seek(0n,WHENCE_END);return{ret:ERRNO_SUCCESS,fd_obj:file}}get size(){return BigInt(this.handle.getSize())}stat(){return new Filestat(FILETYPE_REGULAR_FILE,this.size)}constructor(handle,options){super();this.handle=handle;this.readonly=!!options?.readonly}}class OpenSyncOPFSFile extends Fd{fd_allocate(offset,len){if(BigInt(this.file.handle.getSize())>offset+len){}else{this.file.handle.truncate(Number(offset+len))}return ERRNO_SUCCESS}fd_fdstat_get(){return{ret:0,fdstat:new Fdstat(FILETYPE_REGULAR_FILE,0)}}fd_filestat_get(){return{ret:0,filestat:new Filestat(FILETYPE_REGULAR_FILE,BigInt(this.file.handle.getSize()))}}fd_filestat_set_size(size){this.file.handle.truncate(Number(size));return ERRNO_SUCCESS}fd_read(size){const buf=new Uint8Array(size);const n=this.file.handle.read(buf,{at:Number(this.position)});this.position+=BigInt(n);return{ret:0,data:buf.slice(0,n)}}fd_seek(offset,whence){let calculated_offset;switch(whence){case WHENCE_SET:calculated_offset=BigInt(offset);break;case WHENCE_CUR:calculated_offset=this.position+BigInt(offset);break;case WHENCE_END:calculated_offset=BigInt(this.file.handle.getSize())+BigInt(offset);break;default:return{ret:ERRNO_INVAL,offset:0n}}if(calculated_offset<0){return{ret:ERRNO_INVAL,offset:0n}}this.position=calculated_offset;return{ret:ERRNO_SUCCESS,offset:this.position}}fd_write(data){if(this.file.readonly)return{ret:ERRNO_BADF,nwritten:0};const n=this.file.handle.write(data,{at:Number(this.position)});this.position+=BigInt(n);return{ret:ERRNO_SUCCESS,nwritten:n}}fd_sync(){this.file.handle.flush();return ERRNO_SUCCESS}constructor(file){super();this.position=0n;this.file=file}}
class OpenFile extends Fd{fd_allocate(offset,len){if(this.file.size>offset+len){}else{const new_data=new Uint8Array(Number(offset+len));new_data.set(this.file.data,0);this.file.data=new_data}return ERRNO_SUCCESS}fd_fdstat_get(){return{ret:0,fdstat:new Fdstat(FILETYPE_REGULAR_FILE,0)}}fd_filestat_set_size(size){if(this.file.size>size){this.file.data=new Uint8Array(this.file.data.buffer.slice(0,Number(size)))}else{const new_data=new Uint8Array(Number(size));new_data.set(this.file.data,0);this.file.data=new_data}return ERRNO_SUCCESS}fd_read(size){const slice=this.file.data.slice(Number(this.file_pos),Number(this.file_pos+BigInt(size)));this.file_pos+=BigInt(slice.length);return{ret:0,data:slice}}fd_pread(size,offset){const slice=this.file.data.slice(Number(offset),Number(offset+BigInt(size)));return{ret:0,data:slice}}fd_seek(offset,whence){let calculated_offset;switch(whence){case WHENCE_SET:calculated_offset=offset;break;case WHENCE_CUR:calculated_offset=this.file_pos+offset;break;case WHENCE_END:calculated_offset=BigInt(this.file.data.byteLength)+offset;break;default:return{ret:ERRNO_INVAL,offset:0n}}if(calculated_offset<0){return{ret:ERRNO_INVAL,offset:0n}}this.file_pos=calculated_offset;return{ret:0,offset:this.file_pos}}fd_tell(){return{ret:0,offset:this.file_pos}}fd_write(data){if(this.file.readonly)return{ret:ERRNO_BADF,nwritten:0};if(this.file_pos+BigInt(data.byteLength)>this.file.size){const old=this.file.data;this.file.data=new Uint8Array(Number(this.file_pos+BigInt(data.byteLength)));this.file.data.set(old)}this.file.data.set(data,Number(this.file_pos));this.file_pos+=BigInt(data.byteLength);return{ret:0,nwritten:data.byteLength}}fd_pwrite(data,offset){if(this.file.readonly)return{ret:ERRNO_BADF,nwritten:0};if(offset+BigInt(data.byteLength)>this.file.size){const old=this.file.data;this.file.data=new Uint8Array(Number(offset+BigInt(data.byteLength)));this.file.data.set(old)}this.file.data.set(data,Number(offset));return{ret:0,nwritten:data.byteLength}}fd_filestat_get(){return{ret:0,filestat:this.file.stat()}}constructor(file){super();this.file_pos=0n;this.file=file}}class OpenDirectory extends Fd{fd_seek(offset,whence){return{ret:ERRNO_BADF,offset:0n}}fd_tell(){return{ret:ERRNO_BADF,offset:0n}}fd_allocate(offset,len){return ERRNO_BADF}fd_fdstat_get(){return{ret:0,fdstat:new Fdstat(FILETYPE_DIRECTORY,0)}}fd_readdir_single(cookie){if(debug.enabled){debug.log("readdir_single",cookie);debug.log(cookie,this.dir.contents.keys())}if(cookie==0n){return{ret:ERRNO_SUCCESS,dirent:new Dirent(1n,".",FILETYPE_DIRECTORY)}}else if(cookie==1n){return{ret:ERRNO_SUCCESS,dirent:new Dirent(2n,"..",FILETYPE_DIRECTORY)}}if(cookie>=BigInt(this.dir.contents.size)+2n){return{ret:0,dirent:null}}const[name,entry]=Array.from(this.dir.contents.entries())[Number(cookie-2n)];return{ret:0,dirent:new Dirent(cookie+1n,name,entry.stat().filetype)}}path_filestat_get(flags,path_str){const{ret:path_err,path}=Path.from(path_str);if(path==null){return{ret:path_err,filestat:null}}const{ret,entry}=this.dir.get_entry_for_path(path);if(entry==null){return{ret,filestat:null}}return{ret:0,filestat:entry.stat()}}path_lookup(path_str,dirflags){const{ret:path_ret,path}=Path.from(path_str);if(path==null){return{ret:path_ret,inode_obj:null}}const{ret,entry}=this.dir.get_entry_for_path(path);if(entry==null){return{ret,inode_obj:null}}return{ret:ERRNO_SUCCESS,inode_obj:entry}}path_open(dirflags,path_str,oflags,fs_rights_base,fs_rights_inheriting,fd_flags){const{ret:path_ret,path}=Path.from(path_str);if(path==null){return{ret:path_ret,fd_obj:null}}let{ret,entry}=this.dir.get_entry_for_path(path);if(entry==null){if(ret!=ERRNO_NOENT){return{ret,fd_obj:null}}if((oflags&OFLAGS_CREAT)==OFLAGS_CREAT){const{ret,entry:new_entry}=this.dir.create_entry_for_path(path_str,(oflags&OFLAGS_DIRECTORY)==OFLAGS_DIRECTORY);if(new_entry==null){return{ret,fd_obj:null}}entry=new_entry}else{return{ret:ERRNO_NOENT,fd_obj:null}}}else if((oflags&OFLAGS_EXCL)==OFLAGS_EXCL){return{ret:ERRNO_EXIST,fd_obj:null}}if((oflags&OFLAGS_DIRECTORY)==OFLAGS_DIRECTORY&&entry.stat().filetype!==FILETYPE_DIRECTORY){return{ret:ERRNO_NOTDIR,fd_obj:null}}return entry.path_open(oflags,fs_rights_base,fd_flags)}path_create_directory(path){return this.path_open(0,path,OFLAGS_CREAT|OFLAGS_DIRECTORY,0n,0n,0).ret}path_link(path_str,inode,allow_dir){const{ret:path_ret,path}=Path.from(path_str);if(path==null){return path_ret}if(path.is_dir){return ERRNO_NOENT}const{ret:parent_ret,parent_entry,filename,entry}=this.dir.get_parent_dir_and_entry_for_path(path,true);if(parent_entry==null||filename==null){return parent_ret}if(entry!=null){const source_is_dir=inode.stat().filetype==FILETYPE_DIRECTORY;const target_is_dir=entry.stat().filetype==FILETYPE_DIRECTORY;if(source_is_dir&&target_is_dir){if(allow_dir&&entry instanceof Directory){if(entry.contents.size==0){}else{return ERRNO_NOTEMPTY}}else{return ERRNO_EXIST}}else if(source_is_dir&&!target_is_dir){return ERRNO_NOTDIR}else if(!source_is_dir&&target_is_dir){return ERRNO_ISDIR}else if(inode.stat().filetype==FILETYPE_REGULAR_FILE&&entry.stat().filetype==FILETYPE_REGULAR_FILE){}else{return ERRNO_EXIST}}if(!allow_dir&&inode.stat().filetype==FILETYPE_DIRECTORY){return ERRNO_PERM}parent_entry.contents.set(filename,inode);return ERRNO_SUCCESS}path_unlink(path_str){const{ret:path_ret,path}=Path.from(path_str);if(path==null){return{ret:path_ret,inode_obj:null}}const{ret:parent_ret,parent_entry,filename,entry}=this.dir.get_parent_dir_and_entry_for_path(path,true);if(parent_entry==null||filename==null){return{ret:parent_ret,inode_obj:null}}if(entry==null){return{ret:ERRNO_NOENT,inode_obj:null}}parent_entry.contents.delete(filename);return{ret:ERRNO_SUCCESS,inode_obj:entry}}path_unlink_file(path_str){const{ret:path_ret,path}=Path.from(path_str);if(path==null){return path_ret}const{ret:parent_ret,parent_entry,filename,entry}=this.dir.get_parent_dir_and_entry_for_path(path,false);if(parent_entry==null||filename==null||entry==null){return parent_ret}if(entry.stat().filetype===FILETYPE_DIRECTORY){return ERRNO_ISDIR}parent_entry.contents.delete(filename);return ERRNO_SUCCESS}path_remove_directory(path_str){const{ret:path_ret,path}=Path.from(path_str);if(path==null){return path_ret}const{ret:parent_ret,parent_entry,filename,entry}=this.dir.get_parent_dir_and_entry_for_path(path,false);if(parent_entry==null||filename==null||entry==null){return parent_ret}if(!(entry instanceof Directory)||entry.stat().filetype!==FILETYPE_DIRECTORY){return ERRNO_NOTDIR}if(entry.contents.size!==0){return ERRNO_NOTEMPTY}if(!parent_entry.contents.delete(filename)){return ERRNO_NOENT}return ERRNO_SUCCESS}fd_filestat_get(){return{ret:0,filestat:this.dir.stat()}}fd_filestat_set_size(size){return ERRNO_BADF}fd_read(size){return{ret:ERRNO_BADF,data:new Uint8Array}}fd_pread(size,offset){return{ret:ERRNO_BADF,data:new Uint8Array}}fd_write(data){return{ret:ERRNO_BADF,nwritten:0}}fd_pwrite(data,offset){return{ret:ERRNO_BADF,nwritten:0}}constructor(dir){super();this.dir=dir}}class PreopenDirectory extends OpenDirectory{fd_prestat_get(){return{ret:0,prestat:Prestat.dir(this.prestat_name)}}constructor(name,contents){super(new Directory(contents));this.prestat_name=name}}class File extends Inode{path_open(oflags,fs_rights_base,fd_flags){if(this.readonly&&(fs_rights_base&BigInt(RIGHTS_FD_WRITE))==BigInt(RIGHTS_FD_WRITE)){return{ret:ERRNO_PERM,fd_obj:null}}if((oflags&OFLAGS_TRUNC)==OFLAGS_TRUNC){if(this.readonly)return{ret:ERRNO_PERM,fd_obj:null};this.data=new Uint8Array([])}const file=new OpenFile(this);if(fd_flags&FDFLAGS_APPEND)file.fd_seek(0n,WHENCE_END);return{ret:ERRNO_SUCCESS,fd_obj:file}}get size(){return BigInt(this.data.byteLength)}stat(){return new Filestat(FILETYPE_REGULAR_FILE,this.size)}constructor(data,options){super();this.data=new Uint8Array(data);this.readonly=!!options?.readonly}}let Path=class Path{static from(path){const self=new Path;self.is_dir=path.endsWith("/");if(path.startsWith("/")){return{ret:ERRNO_NOTCAPABLE,path:null}}if(path.includes("\x00")){return{ret:ERRNO_INVAL,path:null}}for(const component of path.split("/")){if(component===""||component==="."){continue}if(component===".."){if(self.parts.pop()==undefined){return{ret:ERRNO_NOTCAPABLE,path:null}}continue}self.parts.push(component)}return{ret:ERRNO_SUCCESS,path:self}}to_path_string(){let s=this.parts.join("/");if(this.is_dir){s+="/"}return s}constructor(){this.parts=[];this.is_dir=false}};class Directory extends Inode{path_open(oflags,fs_rights_base,fd_flags){return{ret:ERRNO_SUCCESS,fd_obj:new OpenDirectory(this)}}stat(){return new Filestat(FILETYPE_DIRECTORY,0n)}get_entry_for_path(path){let entry=this;for(const component of path.parts){if(!(entry instanceof Directory)){return{ret:ERRNO_NOTDIR,entry:null}}const child=entry.contents.get(component);if(child!==undefined){entry=child}else{debug.log(component);return{ret:ERRNO_NOENT,entry:null}}}if(path.is_dir){if(entry.stat().filetype!=FILETYPE_DIRECTORY){return{ret:ERRNO_NOTDIR,entry:null}}}return{ret:ERRNO_SUCCESS,entry}}get_parent_dir_and_entry_for_path(path,allow_undefined){const filename=path.parts.pop();if(filename===undefined){return{ret:ERRNO_INVAL,parent_entry:null,filename:null,entry:null}}const{ret:entry_ret,entry:parent_entry}=this.get_entry_for_path(path);if(parent_entry==null){return{ret:entry_ret,parent_entry:null,filename:null,entry:null}}if(!(parent_entry instanceof Directory)){return{ret:ERRNO_NOTDIR,parent_entry:null,filename:null,entry:null}}const entry=parent_entry.contents.get(filename);if(entry===undefined){if(!allow_undefined){return{ret:ERRNO_NOENT,parent_entry:null,filename:null,entry:null}}else{return{ret:ERRNO_SUCCESS,parent_entry,filename,entry:null}}}if(path.is_dir){if(entry.stat().filetype!=FILETYPE_DIRECTORY){return{ret:ERRNO_NOTDIR,parent_entry:null,filename:null,entry:null}}}return{ret:ERRNO_SUCCESS,parent_entry,filename,entry}}create_entry_for_path(path_str,is_dir){const{ret:path_ret,path}=Path.from(path_str);if(path==null){return{ret:path_ret,entry:null}}let{ret:parent_ret,parent_entry,filename,entry}=this.get_parent_dir_and_entry_for_path(path,true);if(parent_entry==null||filename==null){return{ret:parent_ret,entry:null}}if(entry!=null){return{ret:ERRNO_EXIST,entry:null}}debug.log("create",path);let new_child;if(!is_dir){new_child=new File(new ArrayBuffer(0))}else{new_child=new Directory(new Map)}parent_entry.contents.set(filename,new_child);entry=new_child;return{ret:ERRNO_SUCCESS,entry}}constructor(contents){super();if(contents instanceof Array){this.contents=new Map(contents)}else{this.contents=contents}}}class ConsoleStdout extends Fd{fd_filestat_get(){const filestat=new Filestat(FILETYPE_CHARACTER_DEVICE,BigInt(0));return{ret:0,filestat}}fd_fdstat_get(){const fdstat=new Fdstat(FILETYPE_CHARACTER_DEVICE,0);fdstat.fs_rights_base=BigInt(RIGHTS_FD_WRITE);return{ret:0,fdstat}}fd_write(data){this.write(data);return{ret:0,nwritten:data.byteLength}}static lineBuffered(write){const dec=new TextDecoder("utf-8",{fatal:false});let line_buf="";return new ConsoleStdout(buffer=>{line_buf+=dec.decode(buffer,{stream:true});const lines=line_buf.split("\n");for(const[i,line]of lines.entries()){if(i<lines.length-1){write(line)}else{line_buf=line}}})}constructor(write){super();this.write=write}}
// This script is intended to be used by D8, JSShell or JSC. We distinguish
// them by the functions they offer to read files:
//
// Engine         | Shell    | FileRead             |  Arguments
// --------------------------------------------------------------
// V8             | D8       | readbuffer           |  arguments (arg0 arg1)
// JavaScriptCore | JSC      | readFile             |  arguments (arg0 arg1)
// SpiderMonkey   | JSShell  | readRelativeToScript |  scriptArgs (-- arg0 arg1)
//
const isD8 = (typeof readbuffer === "function");
const isJSC = (typeof readFile === "function");
const isJSShell = (typeof readRelativeToScript === "function");

if (isD8) {
    // D8's performance.measure is API incompatible with the browser version.
    //
    // (see also dart2js's `sdk/**/js_runtime/lib/preambles/d8.js`)
    delete performance.measure;
  }
  
  var args =  (isD8 || isJSC) ? arguments : scriptArgs;
  var pythonArgs = [];
  const argsSplit = args.indexOf("--");
  if (argsSplit != -1) {
    pythonArgs = args.slice(argsSplit + 1);
    args = args.slice(0, argsSplit);
  }

function read_file(filename){
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
        withJsStringBuiltins ? {builtins: ['js-string']} : {}
    );
}


(function(self, scriptArguments) {
  // Using strict mode to avoid accidentally defining global variables.
  "use strict"; // Should be first statement of this function.

  // Task queue as cyclic list queue.
  var taskQueue = new Array(8);  // Length is power of 2.
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
    if (split * 2 < length) {  // split < length / 2
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
  var timerIdCounter = 1;  // Counter used to assign ids.

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
    } while (true)
    var id = action.$timerId;
    clearTimerId(action, id);
    return action;
  }

  // Mocking time.
  var timeOffset = 0;
  var now = function() {
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
          case 0:  return new originalDate(originalNow() + timeOffset);
          case 1:  return new originalDate(Y);
          case 2:  return new originalDate(Y, M);
          case 3:  return new originalDate(Y, M, D);
          case 4:  return new originalDate(Y, M, D, h);
          case 5:  return new originalDate(Y, M, D, h, m);
          case 6:  return new originalDate(Y, M, D, h, m, s);
          default: return new originalDate(Y, M, D, h, m, s, ms);
        }
      }
      return new originalDate(originalNow() + timeOffset).toString();
    };
    NewDate.UTC = originalDate.UTC;
    NewDate.parse = originalDate.parse;
    NewDate.now = function now() { return originalNow() + timeOffset; };
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
          print('Error: ' + e);
          print('Stack: ' + e.stack);
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
  self.wasi_runner = function(main) {
    // Initialize.
    var action = async function() { await main(); }
    eventLoop(action);
  };
  self.setTimeout = addTimer;
  self.clearTimeout = cancelTimer;
  self.setInterval = addInterval;
  self.clearInterval = cancelTimer;
  self.queueMicrotask = addTask;

  self.location = {}

  // Signals `Stopwatch._initTicker` to use `Date.now` to get ticks instead of
  // `performance.now`, as it's not available in d8.
  self.dartUseDateNowForTicks = true;
})(this, []);
 
async function wasi_main() {
  let wasi_args = ["ruby.wasm", "-EUTF-8", "-e_=0", "--version"];
let env = [];
let fds = [
    new OpenFile(new File([])), // stdin
    ConsoleStdout.lineBuffered(msg => print(`[WASI stdout] ${msg}`)),
    ConsoleStdout.lineBuffered(msg => print(`[WASI stderr] ${msg}`)),
    new PreopenDirectory(".", [
            ["testcase.rb", new File(new TextEncoder().encode("put \"Hello World!\""))]
    ])
];
let wasi = new WASI(wasi_args, env, fds);
    let wasm = await WebAssembly.compile(read_file("./ruby.wasm"));
    let inst = await WebAssembly.instantiate(wasm, {
        "wasi_snapshot_preview1": wasi.wasiImport,
    });
    wasi.start(inst);
}
wasi_runner(wasi_main)
