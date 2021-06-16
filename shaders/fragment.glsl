uniform sampler2D EarthTexture;

varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
  float intensity = 1.2 - dot(vertexNormal, vec3(0.0,0.0,1.0));
  vec3 atmosphere = vec3(0.3,0.45,0.45) * pow(intensity,1.5);

  gl_FragColor = vec4( texture2D(EarthTexture, vertexUV).xyz - atmosphere, 1.0);
}
