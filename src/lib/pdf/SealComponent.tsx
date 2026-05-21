import React from 'react';
import { View, Image, StyleSheet, Text } from '@react-pdf/renderer';

interface SealProps {
  logoUrl: string;
  size?: number;
  borderColor?: string;
  rotation?: number;
}

const s = StyleSheet.create({
  sealContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringOuter: {
    borderRadius: 999,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ringMiddle: {
    borderRadius: 999,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringInner: {
    borderRadius: 999,
    borderWidth: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    objectFit: 'contain',
  },
  sealText: {
    position: 'absolute',
    fontSize: 5,
    fontFamily: 'NotoSansBold',
    textTransform: 'uppercase',
    color: '#008236',
    opacity: 0.5,
  }
});

/**
 * SealComponent - Creates a highly realistic institutional rubber stamp seal
 */
export const SealComponent: React.FC<SealProps> = ({
  logoUrl,
  size = 70,
  borderColor = '#008236',
}) => {
  const middleRingSize = size * 0.92;
  const innerRingSize = size * 0.78;
  const logoBoxSize = size * 0.55;

  return (
    <View
      style={[
        s.sealContainer,
        {
          width: size,
          height: size,
        },
      ]}
    >
      {/* Outer Ring */}
      <View
        style={[
          s.ringOuter,
          {
            width: size,
            height: size,
            borderColor: borderColor,
          },
        ]}
      >
        {/* Middle decorative Ring */}
        <View
          style={[
            s.ringMiddle,
            {
              width: middleRingSize,
              height: middleRingSize,
              borderColor: borderColor,
            },
          ]}
        >
          {/* Inner main Ring */}
          <View
            style={[
              s.ringInner,
              {
                width: innerRingSize,
                height: innerRingSize,
                borderColor: borderColor,
              },
            ]}
          >
            {/* Logo container */}
            <View
              style={[
                s.logoWrapper,
                {
                  width: logoBoxSize,
                  height: logoBoxSize,
                  borderRadius: logoBoxSize / 2,
                },
              ]}
            >
              <Image
                src={logoUrl}
                style={[
                  s.logo,
                  {
                    width: logoBoxSize * 0.85,
                    height: logoBoxSize * 0.85,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>
      
      {/* Authentic stamp text positioning */}
      <Text style={[s.sealText, { top: size * 0.08, left: '30%' }]}>OFFICIAL</Text>
      <Text style={[s.sealText, { bottom: size * 0.08, left: '38%' }]}>SEAL</Text>
    </View>
  );
};

export default SealComponent;
