//
//  RCTStoreManager.h
//  GoldfingrNative
//
//  Created by Juan Gabriel Gutierrez on 2015-06-10.
//  Copyright (c) 2015 Facebook. All rights reserved.
//


#import  "RCTBridge.h"

@interface RCTStoreManager :  NSObject <RCTBridgeModule>


- (BOOL)storeDataIntoLocalFilesystem:(id)content intoFile:(NSString *)filename inDirectory:(NSString *)directory;

- (NSMutableArray*) retrieveFilesFromDir:(NSString *)directory;

- (NSString*) getFullPath:(NSString *)directory storedFilename:(NSString *)filename;

- (BOOL)removeFile:(NSString *)filename inDirectory:(NSString *)directory;

@end
